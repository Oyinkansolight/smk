export interface PaginatedData<T> {
  data: T[];
  count: number;
  paging: {
    totalPage: number;
    currentPage: number;
    itemCount: number;
    totalItems: number;
    totalPlatformStudents?: number;
    totalInstitutionStudents?: number;
  };
}

//! T is the specific type of data in which if staff is provided then T is Staff and if student is provided then T is Student, so on.
export interface StaffPaginatedData<T> {
  data: {
    staffs: T[];
    students: T[];
    count: number;
  };
  paging: {
    totalPage: number;
    currentPage: number;
    itemCount: number;
  };
}
