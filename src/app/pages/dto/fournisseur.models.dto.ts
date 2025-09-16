export interface FournisseurDto {
  id: number;
  nom: string;
  contact: string;
  nif: string;
  adresse: string;
  receptions?: any[];
}
export interface FournisseurResponseDto {
  id: number;
  nom: string;
  contact: string;
  nif: string;
  adresse: string;
  receptions?: any[];
}