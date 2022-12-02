export interface Teacher {
    id:       number;
    name:     string;
    surName:  string;
    birth:    Date;
    idCard:   number;
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
