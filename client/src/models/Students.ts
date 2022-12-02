export interface Student {
    id:        string;
    name:      string;
    surName:   string;
    sex:       string;
    birthday:  string;
    email:     string;
    tel:       string;
    address:   string;
    oldEdu:    string;
    img:       string;
    oldSchool: string;
    titleId:   number;
    title:     Title;
    statusId:  number;
    status:    Status;
}

export interface Title {
    id:   number;
    name: string;
}

export interface Status {
    id:   number;
    name: string;
}

export interface StudentParams {
    orderBy: string;
    searchTerm?: string;
    status: string[];
    title: string[];
    pageNumber: number;
    pageSize: number;
}
