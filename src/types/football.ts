export interface DashboardStats {
  users: number;
  players: number;
  teams: number;
  matches: number;
  goals: number;
  tournaments: number;
  trainings: number;
}

export interface Player {
  id: number;
  name: string;
  email: string;
  position: "DEFENDER" | "MIDFIELDER" | "FORWARD" | "GOALKEEPER";
  rating: number | null;
  shirtNumber: number | null;
  teamId: number;
  teamName: string;
  goalsCount: number;
  assistsCount: number;
  yellowCardsCount: number;
  redCardsCount: number;
  appearancesCount: number;
  hasAvatar?: boolean;
}

export interface Team {
  id: number;
  name: string;
  description?: string;
  playerCount: number;
  isDefault?: boolean;
  hasLogo?: boolean;
}

export interface Match {
  id: number;
  team1Id: number;
  team1Name: string;
  team2Id: number;
  team2Name: string;
  scoreTeam1: number | null;
  scoreTeam2: number | null;
  location: string;
  timestamp: string;
  state: "SCHEDULED" | "ONGOING" | "FINISHED";
  leagueName: string;
  round: number;
  hasTeam1Logo?: boolean;
  hasTeam2Logo?: boolean;
}
