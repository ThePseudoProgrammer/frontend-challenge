export interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface ApiResponse {
  data: Cat[];
  status: number;
} 