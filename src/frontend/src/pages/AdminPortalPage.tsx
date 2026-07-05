import { createActor } from "@/backend";
import { type ProjectPublic, ProjectStatus } from "@/backend";
import type { ProjectComment } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  FolderOpen,
  LogIn,
  MessageSquare,
  Plus,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

const STATUS_OPTIONS: { value: ProjectStatus; label: string }[] = [
  { value: ProjectStatus.pending, label: "Pending" },
  { value: ProjectStatus.inProgress, label: "In Progress" },
  { value: ProjectStatus.review, label: "Review" },
  { value: ProjectStatus.complete, label: "Complete" },
];

function statusConfig(status: ProjectStatus) {
  switch (status) {
    case ProjectStatus.inProgress:
      return {
        label: "In Progress",
        className: "bg-[#E53935]/20 text-[#E53935] border-[#E53935]/30",
      };
    case ProjectStatus.review:
      return {
        label: "Review",
        className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      };
    case ProjectStatus.complete:
      return {
        label: "Complete",
        className: "bg-green-500/20 text-green-400 border-green-500/30",
      };
    default:
      return {
        label: "Pending",
        className: "bg-white/10 text-white/60 border-white/20",
      };
  }
}

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function ProjectCard({ project }: { project: ProjectPublic; index: number }) {
  const { actor, isFetching } = useActor(createActor);
  const qc = useQueryClient();
  const [showComments, setShowComments] = useState(false);

  const { data: comments = [], isLoading: loadingComments } = useQuery<
    ProjectComment[]
  >({
    queryKey: ["adminComments", project.id.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProjectComments(project.id);
    },
    enabled: !!actor && !isFetching && showComments,
  });

  const updateStatus = useMutation({
    mutationFn: async (status: ProjectStatus) => {
      if (!actor) throw new Error("No actor");
      return actor.updateProjectStatus(project.id, status);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminProjects"] }),
  });

  const status = statusConfig(project.status);

  return (
    <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 hover:border-[#E53935]/30 transition-all">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-white font-bold font-display text-base">
          {project.title}
        </h3>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      <p className="text-[#CFCFCF] text-sm leading-relaxed mb-4 line-clamp-2">
        {project.description}
      </p>

      <p className="text-[#CFCFCF]/40 text-xs mb-5">
        Client:{" "}
        <span className="font-mono text-[#CFCFCF]/60">
          {project.clientId.toText().slice(0, 24)}...
        </span>
        {" · "}
        {formatDate(project.createdAt)}
      </p>

      {/* Status update */}
      <div className="flex items-center gap-2 mb-4">
        <select
          defaultValue={project.status}
          onChange={(e) => updateStatus.mutate(e.target.value as ProjectStatus)}
          className="flex-1 bg-[#0A0A0A] border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:border-[#E53935]/50 focus:outline-none"
          data-ocid={`admin.project.status_select.${project.id}`}
          disabled={updateStatus.isPending}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#121212]">
              {opt.label}
            </option>
          ))}
        </select>
        {updateStatus.isPending && (
          <RefreshCw size={14} className="text-[#E53935] animate-spin" />
        )}
        {updateStatus.isSuccess && (
          <span
            className="text-green-400 text-xs"
            data-ocid={`admin.project.success_state.${project.id}`}
          >
            ✓ Updated
          </span>
        )}
      </div>

      {/* Comments toggle */}
      <button
        type="button"
        onClick={() => setShowComments((v) => !v)}
        className="flex items-center gap-2 text-[#CFCFCF] hover:text-[#E53935] transition-colors text-sm"
        data-ocid={`admin.project.comments_toggle.${project.id}`}
      >
        <MessageSquare size={14} />
        {showComments ? "Hide" : "View"} Comments
      </button>

      {showComments && (
        <div className="mt-4 border-t border-white/5 pt-4">
          {loadingComments ? (
            <div data-ocid={`admin.comments.loading_state.${project.id}`}>
              <Skeleton className="h-12 w-full bg-white/5 rounded-lg" />
            </div>
          ) : comments.length === 0 ? (
            <p
              className="text-[#CFCFCF]/40 text-xs py-2"
              data-ocid={`admin.comments.empty_state.${project.id}`}
            >
              No comments yet.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {comments.map((c, ci) => (
                <div
                  key={c.id.toString()}
                  className="bg-[#0A0A0A] rounded-xl p-4"
                  data-ocid={`admin.comment.item.${ci + 1}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#E53935] text-xs font-semibold uppercase">
                      {c.commentType}
                    </span>
                    <span className="text-[#CFCFCF]/40 text-xs">
                      {formatDate(c.postedAt)}
                    </span>
                  </div>
                  <p className="text-[#CFCFCF] text-sm leading-relaxed">
                    {c.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CreateProjectForm({ onClose }: { onClose: () => void }) {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  const [form, setForm] = useState({
    clientId: "",
    title: "",
    description: "",
    status: ProjectStatus.pending as ProjectStatus,
  });
  const [success, setSuccess] = useState(false);

  const createProject = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      const { Principal } = await import("@icp-sdk/core/principal");
      const clientPrincipal = Principal.fromText(form.clientId);
      return actor.createProject(
        clientPrincipal,
        form.title,
        form.description,
        form.status,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["adminProjects"] });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    },
  });

  return (
    <div
      className="bg-[#121212] border border-[#E53935]/30 rounded-2xl p-8 mb-8"
      data-ocid="admin.create_project.form"
    >
      <h3 className="text-white font-bold font-display text-xl mb-6">
        Create New Project
      </h3>
      <div className="flex flex-col gap-5">
        <div>
          <Label
            className="text-[#CFCFCF] text-sm mb-2 block"
            htmlFor="clientId"
          >
            Client Principal ID
          </Label>
          <Input
            id="clientId"
            value={form.clientId}
            onChange={(e) =>
              setForm((f) => ({ ...f, clientId: e.target.value }))
            }
            placeholder="e.g. aaaaa-aa"
            className="bg-[#0A0A0A] border-white/10 text-white placeholder:text-[#CFCFCF]/30 focus:border-[#E53935]/50"
            data-ocid="admin.create_project.client_input"
          />
        </div>
        <div>
          <Label className="text-[#CFCFCF] text-sm mb-2 block" htmlFor="title">
            Project Title
          </Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="Website Redesign"
            className="bg-[#0A0A0A] border-white/10 text-white placeholder:text-[#CFCFCF]/30 focus:border-[#E53935]/50"
            data-ocid="admin.create_project.title_input"
          />
        </div>
        <div>
          <Label
            className="text-[#CFCFCF] text-sm mb-2 block"
            htmlFor="description"
          >
            Description
          </Label>
          <Textarea
            id="description"
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            placeholder="Briefly describe the project scope..."
            className="bg-[#0A0A0A] border-white/10 text-white placeholder:text-[#CFCFCF]/30 min-h-[80px] focus:border-[#E53935]/50 resize-none"
            data-ocid="admin.create_project.description_textarea"
          />
        </div>
        <div>
          <Label
            className="text-[#CFCFCF] text-sm mb-2 block"
            htmlFor="statusSelect"
          >
            Initial Status
          </Label>
          <select
            id="statusSelect"
            value={form.status}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                status: e.target.value as ProjectStatus,
              }))
            }
            className="w-full bg-[#0A0A0A] border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:border-[#E53935]/50 focus:outline-none"
            data-ocid="admin.create_project.status_select"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="bg-[#121212]"
              >
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {createProject.isError && (
          <p
            className="text-[#E53935] text-sm"
            data-ocid="admin.create_project.error_state"
          >
            Failed to create project. Check the Principal ID format and try
            again.
          </p>
        )}
        {success && (
          <p
            className="text-green-400 text-sm"
            data-ocid="admin.create_project.success_state"
          >
            ✓ Project created!
          </p>
        )}

        <div className="flex gap-3">
          <Button
            type="button"
            onClick={() => createProject.mutate()}
            disabled={!form.clientId || !form.title || createProject.isPending}
            className="bg-[#E53935] hover:bg-[#FF3D3D] text-white font-semibold flex-1 disabled:opacity-50"
            data-ocid="admin.create_project.submit_button"
          >
            {createProject.isPending ? "Creating..." : "Create Project"}
          </Button>
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            className="border-white/20 text-[#CFCFCF] hover:border-white/40 hover:text-white bg-transparent"
            data-ocid="admin.create_project.cancel_button"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function AdminPortalPage() {
  const { identity, loginStatus, login } = useInternetIdentity();
  const { actor, isFetching } = useActor(createActor);
  const [showCreate, setShowCreate] = useState(false);

  const { data: projects = [], isLoading } = useQuery<ProjectPublic[]>({
    queryKey: ["adminProjects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProjects();
    },
    enabled: !!actor && !isFetching && loginStatus === "success",
  });

  if (loginStatus !== "success") {
    return (
      <div
        className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4"
        data-ocid="admin.login.page"
      >
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#E53935]/10 border border-[#E53935]/30 flex items-center justify-center mx-auto mb-8">
            <ShieldCheck size={28} className="text-[#E53935]" />
          </div>
          <h1 className="text-3xl font-bold font-display text-white mb-3">
            Team Dashboard
          </h1>
          <p className="text-[#CFCFCF] mb-10 leading-relaxed">
            Log in with Internet Identity to access the Linux Lab Media admin
            panel.
          </p>
          <button
            type="button"
            onClick={() => login()}
            disabled={loginStatus === "logging-in"}
            className="inline-flex items-center justify-center gap-2 bg-[#E53935] hover:bg-[#FF3D3D] text-white font-bold px-8 py-4 rounded-xl transition-colors duration-200 text-lg w-full disabled:opacity-60"
            data-ocid="admin.login.primary_button"
          >
            <LogIn size={20} />
            {loginStatus === "logging-in"
              ? "Connecting..."
              : "Login with Internet Identity"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]" data-ocid="admin.dashboard.page">
      {/* Admin header */}
      <div className="bg-[#121212] border-b border-white/10 px-4 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/assets/llm-logo.png"
              alt="Linux Lab Media"
              className="h-11 w-auto object-contain"
            />
            <div className="w-px h-8 bg-white/10" />
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#E53935]" />
              <h1 className="text-white font-bold font-display text-xl">
                Admin Dashboard
              </h1>
            </div>
          </div>
          <p className="text-[#CFCFCF]/50 text-xs hidden md:block">
            {identity?.getPrincipal().toText().slice(0, 24)}...
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Projects", value: projects.length },
            {
              label: "In Progress",
              value: projects.filter(
                (p) => p.status === ProjectStatus.inProgress,
              ).length,
            },
            {
              label: "In Review",
              value: projects.filter((p) => p.status === ProjectStatus.review)
                .length,
            },
            {
              label: "Complete",
              value: projects.filter((p) => p.status === ProjectStatus.complete)
                .length,
            },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="bg-[#121212] border border-white/10 rounded-xl p-5 text-center"
              data-ocid={`admin.stat.item.${i + 1}`}
            >
              <p className="text-3xl font-bold font-display text-[#E53935] mb-1">
                {stat.value}
              </p>
              <p className="text-[#CFCFCF] text-xs">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Create project */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-display text-white">
            All Projects
          </h2>
          <button
            type="button"
            onClick={() => setShowCreate((v) => !v)}
            className="flex items-center gap-2 bg-[#E53935] hover:bg-[#FF3D3D] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
            data-ocid="admin.create_project.open_modal_button"
          >
            <Plus size={16} />
            New Project
          </button>
        </div>

        {showCreate && (
          <CreateProjectForm onClose={() => setShowCreate(false)} />
        )}

        {isLoading ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            data-ocid="admin.projects.loading_state"
          >
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                className="h-48 w-full bg-white/5 rounded-2xl"
              />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div
            className="text-center py-20"
            data-ocid="admin.projects.empty_state"
          >
            <FolderOpen size={48} className="text-[#E53935]/40 mx-auto mb-4" />
            <p className="text-white font-display font-semibold text-xl mb-2">
              No projects yet
            </p>
            <p className="text-[#CFCFCF] text-sm">
              Create your first project above to get started.
            </p>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            data-ocid="admin.projects.list"
          >
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id.toString()}
                project={project}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
