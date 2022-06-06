export type LoginResTypes = {
    data: {
        id: number;
        accountId: number;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        state: string;
        createdAt: string;
        updatedAt: string;
        account: {
            id: number;
            name: string;
            website: string;
            contactPerson: string;
            contactEmail: string;
            contactPhone: string;
            state: string;
            createdAt: string;
            updatedAt: string;
            brandCategory: any;
            designation: any;
            categoryId: number;
            designationId: number;
            posterId: number;
            qrCode: string;
            description: string;
        };
    };
    token: string;
};