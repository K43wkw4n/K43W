export interface Project {
    id:          number;
    nameTH:      string;
    nameENG:     string;
    date:        Date;
    typePj:      string;
    typefile:    number;
    file:        string;
    github:      string;
    description: string;
    linkWeb:     string;
    video:       string;
    teacherId:   number;
    teacher:     Teacher;
    studentId:   number;
    student:     Student;
}

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

export interface Status {
    id:   number;
    name: string;
}

export interface Teacher {
    id:       string;
    name:     string;
    surName:  string;
    email:    string;
    birth:    string;
    idCard:   string;
    img:      string;
    export:   string;
    lvEdu:    string;
    program:  string;
    position: string;
    titleId:  number;
    title:    Title;
}

export interface Title {
    id:   number;
    name: string;
}