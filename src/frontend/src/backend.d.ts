import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ProjectComment {
    id: bigint;
    clientId: Principal;
    postedAt: bigint;
    content: string;
    projectId: bigint;
    commentType: CommentType;
}
export interface ChatSessionPublic {
    id: string;
    createdAt: bigint;
    isActive: boolean;
    visitorName: string;
}
export interface ProjectPublic {
    id: bigint;
    status: ProjectStatus;
    title: string;
    clientId: Principal;
    createdAt: bigint;
    description: string;
}
export interface ContactSubmission {
    id: bigint;
    projectDescription: string;
    name: string;
    businessType: string;
    submittedAt: bigint;
    email: string;
    phone: string;
}
export interface ChatMessage {
    id: bigint;
    content: string;
    sentAt: bigint;
    senderType: SenderType;
    sessionId: string;
}
export enum CommentType {
    review = "review",
    request = "request",
    comment = "comment"
}
export enum ProjectStatus {
    review = "review",
    pending = "pending",
    complete = "complete",
    inProgress = "inProgress"
}
export enum SenderType {
    team = "team",
    visitor = "visitor"
}
export interface backendInterface {
    addClientComment(projectId: bigint, clientId: Principal, commentType: CommentType, content: string): Promise<ProjectComment>;
    createChatSession(visitorName: string): Promise<ChatSessionPublic>;
    createProject(clientId: Principal, title: string, description: string, status: ProjectStatus): Promise<ProjectPublic>;
    getActiveChatSessions(): Promise<Array<ChatSessionPublic>>;
    getChatMessages(sessionId: string): Promise<Array<ChatMessage>>;
    getClientProjects(clientId: Principal): Promise<Array<ProjectPublic>>;
    getContactSubmissions(): Promise<Array<ContactSubmission>>;
    getProjectComments(projectId: bigint): Promise<Array<ProjectComment>>;
    getProjects(): Promise<Array<ProjectPublic>>;
    sendChatMessage(sessionId: string, senderType: SenderType, content: string): Promise<ChatMessage>;
    submitContactForm(name: string, email: string, phone: string, businessType: string, projectDescription: string): Promise<ContactSubmission>;
    updateProjectStatus(projectId: bigint, status: ProjectStatus): Promise<boolean>;
}
