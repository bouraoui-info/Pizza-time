export interface categories {
    id: number;
    items: string[];
    ranks: number;
    title: string;
    idCard: number;
    imageUrl: string;
    categoryChild: any[]; // This might need further definition
    categoryParent: string;


}