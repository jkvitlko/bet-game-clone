export interface Users {
    
    Name: string;
    Price: string;
    Bet: string;
    ProfileImage: string;
    Id?: string
  
}

export interface Pager {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    startPage: number;
    endPage: number;
    startIndex: number;
    endIndex: number;
    pages: number[]
  }