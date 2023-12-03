export interface stackInterface {
    stack_setter_id: number | undefined;
    stack_setter_name: string;
    stack_setter_tag: string |  undefined;
    stack: number;
}

export interface userListInterface{
    id?: number;
    name: string;
    tag: string;
    stack_list: stackInterface[];
}