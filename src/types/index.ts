export interface DashboardOverview {
  totalInstitutions?: number;
  totalEccdeInstitutions?: number;
  totalPrimaryInstitutions?: number;
  totalSecondaryInstitutions?: number;
  totalTertiaryInstitutions?: number;
}

export interface Label {
  id: string | number;
  value: string;
}
