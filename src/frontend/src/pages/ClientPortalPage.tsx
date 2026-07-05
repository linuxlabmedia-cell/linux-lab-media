import { createActor } from "@/backend";
import {
  CommentType,
  type ProjectComment,
  type ProjectPublic,
  ProjectStatus,
} from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, FolderOpen, LogIn, MessageSquare } from "lucide-react";
import { useState } from "react";

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

function commentTypeLabel(type: CommentType) {
  switch (type) {
    case CommentType.review:
      return "Review";
    case CommentType.request:
      return "Request";
    default:
      return "Comment";
  }
}

function commentTypeBadge(type: CommentType) {
  switch (type) {
    case CommentType.review:
      return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    case CommentType.request:
      return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    default:
      return "bg-[#E53935]/20 text-[#E53935] border-[#E53935]/30";
  }
}

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function ProjectDetail({
  project,
  onBack,
}: { project: ProjectPublic; onBack: () => void }) {
  const { actor, isFetching } = useActor(createActor);
  const qc = useQueryClient();
  const { identity } = useInternetIdentity();
  const [commentType, setCommentType] = useState<CommentType>(
    CommentType.comment,
  );
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { data: comments = [], isLoading } = useQuery<ProjectComment[]>({
    queryKey: ["projectComments", project.id.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProjectComments(project.id);
    },
    enabled: !!actor && !isFetching,
  });

  const addComment = useMutation({
    mutationFn: async () => {
      if (!actor || !identity) throw new Error("Not authenticated");
      return actor.addClientComment(
        project.id,
        identity.getPrincipal(),
        commentType,
        content,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["projectComments", project.id.toString()],
      });
      setContent("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    },
  });

  const status = statusConfig(project.status);

  return (
    <div
      className="min-h-screen bg-[#0A0A0A] px-4 py-8"
      data-ocid="portal.detail.page"
    >
      <div className="max-w-3xl mx-auto">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-[#CFCFCF] hover:text-[#E53935] transition-colors mb-8 text-sm"
          data-ocid="portal.detail.back_button"
        >
          <ArrowLeft size={16} /> Back to Projects
        </button>

        <div className="bg-[#121212] border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-2xl font-bold font-display text-white">
              {project.title}
            </h1>
            <span
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${status.className}`}
            >
              {status.label}
            </span>
          </div>
          <p className="text-[#CFCFCF] leading-relaxed mb-3">
            {project.description}
          </p>
          <p className="text-[#CFCFCF]/50 text-xs">
            Created {formatDate(project.createdAt)}
          </p>
        </div>

        {/* Comments list */}
        <div className="bg-[#121212] border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare size={18} className="text-[#E53935]" />
            <h2 className="text-white font-bold font-display text-lg">
              Comments & Feedback
            </h2>
          </div>

          {isLoading ? (
            <div
              className="flex flex-col gap-3"
              data-ocid="portal.detail.loading_state"
            >
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-20 w-full bg-white/5" />
              ))}
            </div>
          ) : comments.length === 0 ? (
            <p
              className="text-[#CFCFCF]/50 text-sm text-center py-8"
              data-ocid="portal.detail.empty_state"
            >
              No comments yet. Be the first to leave feedback.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {comments.map((c, i) => (
                <div
                  key={c.id.toString()}
                  className="bg-[#0A0A0A] border border-white/5 rounded-xl p-5"
                  data-ocid={`portal.comment.item.${i + 1}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${commentTypeBadge(c.commentType)}`}
                    >
                      {commentTypeLabel(c.commentType)}
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

        {/* Add comment form */}
        <div
          className="bg-[#121212] border border-white/10 rounded-2xl p-8"
          data-ocid="portal.comment.form"
        >
          <h3 className="text-white font-bold font-display text-lg mb-6">
            Add Feedback
          </h3>

          <div className="flex gap-2 mb-5">
            {(
              [
                CommentType.comment,
                CommentType.review,
                CommentType.request,
              ] as CommentType[]
            ).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setCommentType(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                  commentType === t
                    ? "bg-[#E53935] border-[#E53935] text-white"
                    : "bg-transparent border-white/20 text-[#CFCFCF] hover:border-[#E53935]/50"
                }`}
                data-ocid={`portal.comment.type_${t}`}
              >
                {commentTypeLabel(t)}
              </button>
            ))}
          </div>

          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts, feedback, or requests..."
            className="bg-[#0A0A0A] border-white/10 text-white placeholder:text-[#CFCFCF]/40 min-h-[100px] mb-5 focus:border-[#E53935]/50 resize-none"
            data-ocid="portal.comment.textarea"
          />

          {submitted && (
            <p
              className="text-green-400 text-sm mb-4"
              data-ocid="portal.comment.success_state"
            >
              ✓ Feedback submitted successfully!
            </p>
          )}
          {addComment.isError && (
            <p
              className="text-[#E53935] text-sm mb-4"
              data-ocid="portal.comment.error_state"
            >
              Failed to submit. Please try again.
            </p>
          )}

          <Button
            type="button"
            onClick={() => addComment.mutate()}
            disabled={!content.trim() || addComment.isPending}
            className="bg-[#E53935] hover:bg-[#FF3D3D] text-white font-semibold px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50"
            data-ocid="portal.comment.submit_button"
          >
            {addComment.isPending ? "Submitting..." : "Submit Feedback"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProjectGrid({
  projects,
  onSelect,
}: { projects: ProjectPublic[]; onSelect: (p: ProjectPublic) => void }) {
  if (projects.length === 0) {
    return (
      <div
        className="text-center py-20"
        data-ocid="portal.projects.empty_state"
      >
        <FolderOpen size={48} className="text-[#E53935]/40 mx-auto mb-4" />
        <p className="text-white font-display font-semibold text-xl mb-2">
          No Projects Yet
        </p>
        <p className="text-[#CFCFCF] text-sm">
          Your projects will appear here once Linux Lab Media adds them to your
          account.
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      data-ocid="portal.projects.list"
    >
      {projects.map((p, i) => {
        const status = statusConfig(p.status);
        return (
          <button
            key={p.id.toString()}
            type="button"
            onClick={() => onSelect(p)}
            className="text-left bg-[#121212] border border-white/10 rounded-2xl p-6 hover:border-[#E53935]/50 hover:shadow-[0_0_20px_rgba(229,57,53,0.1)] transition-all duration-300 group"
            data-ocid={`portal.projects.item.${i + 1}`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-white font-bold font-display text-base group-hover:text-[#E53935] transition-colors line-clamp-2">
                {p.title}
              </h3>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap flex-shrink-0 ${status.className}`}
              >
                {status.label}
              </span>
            </div>
            <p className="text-[#CFCFCF] text-sm leading-relaxed line-clamp-3 mb-4">
              {p.description}
            </p>
            <p className="text-[#CFCFCF]/40 text-xs">
              Created {formatDate(p.createdAt)}
            </p>
          </button>
        );
      })}
    </div>
  );
}

export default function ClientPortalPage() {
  const { identity, loginStatus, login } = useInternetIdentity();
  const { actor, isFetching } = useActor(createActor);
  const [selected, setSelected] = useState<ProjectPublic | null>(null);

  const { data: projects = [], isLoading } = useQuery<ProjectPublic[]>({
    queryKey: ["clientProjects", identity?.getPrincipal().toText()],
    queryFn: async () => {
      if (!actor || !identity) return [];
      return actor.getClientProjects(identity.getPrincipal());
    },
    enabled: !!actor && !isFetching && !!identity,
  });

  if (loginStatus !== "success") {
    return (
      <div
        className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4"
        data-ocid="portal.login.page"
      >
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#E53935]/10 border border-[#E53935]/30 flex items-center justify-center mx-auto mb-8">
            <img
              src="/assets/llm-logo.png"
              alt="Linux Lab Media"
              className="h-12 w-auto object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold font-display text-white mb-3">
            Client Portal
          </h1>
          <p className="text-[#CFCFCF] mb-10 leading-relaxed">
            Access your project dashboard — view status updates, leave feedback,
            and track progress in real time.
          </p>
          <button
            type="button"
            onClick={() => login()}
            disabled={loginStatus === "logging-in"}
            className="inline-flex items-center justify-center gap-2 bg-[#E53935] hover:bg-[#FF3D3D] text-white font-bold px-8 py-4 rounded-xl transition-colors duration-200 text-lg w-full disabled:opacity-60"
            data-ocid="portal.login.primary_button"
          >
            <LogIn size={20} />
            {loginStatus === "logging-in"
              ? "Connecting..."
              : "Login with Internet Identity"}
          </button>
          <p className="text-[#CFCFCF]/40 text-xs mt-6">
            Secure authentication powered by Internet Identity
          </p>
        </div>
      </div>
    );
  }

  if (selected) {
    return (
      <ProjectDetail project={selected} onBack={() => setSelected(null)} />
    );
  }

  return (
    <div
      className="min-h-screen bg-[#0A0A0A]"
      data-ocid="portal.dashboard.page"
    >
      {/* Portal header */}
      <div className="bg-[#121212] border-b border-white/10 px-4 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/assets/llm-logo.png"
              alt="Linux Lab Media"
              className="h-9 w-auto object-contain"
            />
            <div className="w-px h-8 bg-white/10" />
            <h1 className="text-white font-bold font-display text-xl">
              Client Portal
            </h1>
          </div>
          <div className="text-right">
            <p className="text-[#CFCFCF] text-xs truncate max-w-[200px]">
              {identity?.getPrincipal().toText().slice(0, 20)}...
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Welcome */}
        <div className="mb-10">
          <p className="text-[#E53935] text-sm font-semibold uppercase tracking-widest mb-2">
            Dashboard
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-2">
            Welcome to your portal
          </h2>
          <p className="text-[#CFCFCF]">
            Track your project progress and leave feedback below.
          </p>
        </div>

        {isLoading ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            data-ocid="portal.projects.loading_state"
          >
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                className="h-48 w-full bg-white/5 rounded-2xl"
              />
            ))}
          </div>
        ) : (
          <ProjectGrid projects={projects} onSelect={setSelected} />
        )}
      </div>
    </div>
  );
}
