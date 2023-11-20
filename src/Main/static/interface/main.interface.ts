export interface stackInterface {
    stack_setter_id: number;
    stack_setter_name: string;
    stack: number;
}

export interface userListInterface{
    id?: number;
    name: string;
    tag?: string;
    stack_list: stackInterface[];
}