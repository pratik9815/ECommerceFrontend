export interface GetProductQuery {
    id?: string;
    name?: string | undefined;
    description?: string | undefined;
    price?: number;
    quantity?: number;  
    imgThumbnail?: string | undefined;
    productStatus?: ProductStatus;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    createdDate?: Date | undefined;
    imageLists?: ImageList[] | undefined;
    categories?: CategoryList[] | undefined;
    subCategories?: SubCategoryList[] | undefined;
}

export enum ProductStatus {
    InStock = 0,
    OutOfStock = 1,
    Damaged = 2,
    LimitedStock = 3,
}
export interface ImageList {
    imageId?: string;
    imageName?: string | undefined;
    imageUrl?: string | undefined;
}
export interface CategoryList {
    categoryId?: string;
    categoryName?: string | undefined;
}

export interface SubCategoryList {
    subCategoryId?: string;
    subCategoryName?: string | undefined;
}