export type Language = 'en' | 'fr' | 'kn';

export interface PageContent {
  pageTitle: string;
  quickLinksTitle: string;
  registrationLink: string;
  resetLink: string;
  welcomeMessage: string;
  mainLink: string;
  pageCanBeUsedTo: string;
  useCases: string[];
  allTasksMessage: string;
  requirementMessage: string;
  notRegisteredMessage: string;
  clickHereLink: string;
  videoTutorialsMessage: string;
  queriesMessage: string;
  remoteWorkTitle: string;
  remoteWorkSteps: string[];
}