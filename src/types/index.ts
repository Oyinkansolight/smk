export interface DashboardOverview {
  Total_Students?: number;
  Total_Staff?: number;
  Total_Grades?: number;
  Total_Schools?: number;
  Total_ECCDE?: number;
  Total_Primary?: number;
  Total_Secondary?: number;
  Total_Tertiary?: number;
  Total_Teachers?: number;
  Total_Subjects?: number;
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

