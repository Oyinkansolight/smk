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

export interface LocalGovernmentArea {
  id?: number;
  name?: string;
  towns?: Town[];
  value?: number;
  label?: string;
}

export interface Town {
  id?: number;
  name?: string;
  value?: number;
  label?: string;
}

