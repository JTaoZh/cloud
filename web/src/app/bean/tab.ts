export class Tab{
    name:string;
    route:string;
}

export const Tabs:Tab[] = [
    {name:'实时监测', route:'monitor'},
    {name:'历史记录', route:'history'},
    {name:'设备控制', route:'control'},
    {name:'设备位置', route:'position'},
]