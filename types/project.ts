export interface Project {
  id: number;
  title: string;
  row: number;
  col: number;
  colSpan: number;
  rowSpan: number;
  image: string;
  description: string;
  details: string[];
  gallery: string[];
}