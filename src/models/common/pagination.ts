export interface PaginationResponse<T> {
    total_Records: number;
    total_Pages: number;
    page: number;
    page_Size: number;
    items: T[];
}

export interface PageQuery {
    page?: number;
    pageSize?: number;
}