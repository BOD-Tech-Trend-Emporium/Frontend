export interface CategoryEntity {
  id: number;
  name: string;
}
export interface CreateCategoryDto {
  name: string;
}
export interface UpdateCategoryByIdResponseDto {
  message: string;
}
export interface UpdateCategoryDto {
  name: string;
}