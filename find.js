const Files = java.nio.file.Files;
const Paths = java.nio.file.Paths;
const StandardCharsets = java.nio.charset.StandardCharsets;
//East
//常量部分
const EastScanPos = [
    { startPos: pos(790,75,-1430), faceOffset: {y:74,z:-1428}, floor: 1 },
    { startPos: pos(790,76,-1427), faceOffset: {y:77,z:-1427}, floor: 2},
    { startPos: pos(790,79,-1427), faceOffset: {y:80,z:-1427}, floor: 3 },
    { startPos: pos(790,83,-1431), faceOffset: {y:82,z:-1429}, floor: 4 },
    { startPos: pos(790,75,-1434), faceOffset: {y:74,z:-1436}, floor: 1 },
    { startPos: pos(790,76,-1437), faceOffset: {y:77,z:-1437}, floor: 2 },
    { startPos: pos(790,79,-1437), faceOffset: {y:80,z:-1437}, floor: 3 },
    { startPos: pos(790,83,-1433), faceOffset: {y:82,z:-1435}, floor: 4 },
]
let facing=1
blocks = new Map()
itemFrameMap = new Map()
function pos(x,y,z){
    return PositionCommon.createBlockPos(x,y,z)
}
function pos2str(pos){
    return `${pos.getX()},${pos.getY()},${pos.getZ()}`
}
function framefacting(pos1,x,y,z)
{
    switch (pos1.floor)
    {
        case 1:
            return pos(x,y+1,z);
        case 2:
        {
            if(pos1.faceOffset.z>-1432)
                return pos(x,y,z-1);
            else
                return pos(x,y,z+1);
        }
        case 3:
        {
            if(pos1.faceOffset.z>-1432)
                return pos(x,y,z-1);
            else
                return pos(x,y,z+1);
        }
        case 4:
            return pos(x,y-1,z);
    }
}
// 获取所有类型为 minecraft:item_frame 的实体
World.getEntities("minecraft:item_frame").forEach(entity => {
    let pos = entity.getBlockPos()
    let item = entity.getItem()
    itemFrameMap.set(pos2str(pos), item)
})
// Chat.log(itemFrameMap.get(pos2str(framefacting(WestScanPos[5],801,76,-1437))))
wall=853
function EastscanRow(pos)
{
    // World.getBlock()
    x=pos.startPos.getX()
    y=pos.startPos.getY()
    z=pos.startPos.getZ()
    while(x<=wall)
    {
        if(itemFrameMap.has(pos2str(framefacting(pos,x,y,z))))//先判断展示框
        {
            if(itemFrameMap.get(pos2str(framefacting(pos,x,y,z))).getName().getString()!="空气")
                blocks.set(itemFrameMap.get(pos2str(framefacting(pos,x,y,z))).getName().getString(),{dx:x,dy:y,dz:z,df:(pos.floor),fo:(pos.faceOffset)});
        }
        else if(World.getBlock(framefacting(pos,x,y,z)).getName().getString()!="空气")
        {
            if(!blocks.has(World.getBlock(framefacting(pos,x,y,z)).getName().getString()))
            {
                if(World.getBlock(framefacting(pos,x,y,z)).getName().getString().includes("墙上的失活"))
                    blocks.set("失活的"+World.getBlock(framefacting(pos,x,y,z)).getName().getString().replace("墙上的失活", ""),{dx:x,dy:y,dz:z,df:(pos.floor),fo:(pos.faceOffset)})
                else if(World.getBlock(framefacting(pos,x,y,z)).getName().getString()=="红石线")
                    blocks.set("红石粉",{dx:x,dy:y,dz:z,df:(pos.floor),fo:(pos.faceOffset)})
                else
                    blocks.set(World.getBlock(framefacting(pos,x,y,z)).getName().getString().replace("盆栽",""),{dx:x,dy:y,dz:z,df:(pos.floor),fo:(pos.faceOffset)})
            }
        }
        else if(World.getBlock(x,y,z).getName().getString()!="空气")
        {
            if(!blocks.has(World.getBlock(x,y,z).getName().getString()))
            {
                blocks.set(World.getBlock(x,y,z).getName().getString().replace("盆栽",""),{dx:x,dy:y,dz:z,df:(pos.floor),fo:(pos.faceOffset)})
            }
        }
        x+=facing;
    }
}
EastScanPos.forEach(pos => {
    EastscanRow(pos)
})



//West
const WestScanPos = [
    { startPos: pos(764,75,-1434), faceOffset: {y:74,z:-1436}, floor: 1 },
    { startPos: pos(764,76,-1437), faceOffset: {y:77,z:-1437}, floor: 2},
    { startPos: pos(764,79,-1437), faceOffset: {y:80,z:-1437}, floor: 3 },
    { startPos: pos(764,83,-1433), faceOffset: {y:82,z:-1435}, floor: 4 },
    { startPos: pos(764,75,-1430), faceOffset: {y:74,z:-1428}, floor: 1 },
    { startPos: pos(764,76,-1427), faceOffset: {y:77,z:-1427}, floor: 2 },
    { startPos: pos(764,79,-1427), faceOffset: {y:80,z:-1427}, floor: 3 },
    { startPos: pos(764,83,-1431), faceOffset: {y:82,z:-1429}, floor: 4 },
]
facing=-1
wall=701
function WestscanRow(pos)
{
    // World.getBlock()
    x=pos.startPos.getX()
    y=pos.startPos.getY()
    z=pos.startPos.getZ()
    while(x>=wall)
    {
        if(itemFrameMap.has(pos2str(framefacting(pos,x,y,z))))//先判断展示框
        {
            if(itemFrameMap.get(pos2str(framefacting(pos,x,y,z))).getName().getString()!="空气")
                blocks.set(itemFrameMap.get(pos2str(framefacting(pos,x,y,z))).getName().getString(),{dx:x,dy:y,dz:z,df:(pos.floor),fo:(pos.faceOffset)});
        }
        else if(World.getBlock(framefacting(pos,x,y,z)).getName().getString()!="空气")
        {
            if(!blocks.has(World.getBlock(framefacting(pos,x,y,z)).getName().getString()))
            {
                if(World.getBlock(framefacting(pos,x,y,z)).getName().getString().includes("墙上的失活"))
                    blocks.set("失活的"+World.getBlock(framefacting(pos,x,y,z)).getName().getString().replace("墙上的失活", ""),{dx:x,dy:y,dz:z,df:(pos.floor),fo:(pos.faceOffset)})
                else if(World.getBlock(framefacting(pos,x,y,z)).getName().getString()=="红石线")
                    blocks.set("红石粉",{dx:x,dy:y,dz:z,df:(pos.floor),fo:(pos.faceOffset)})
                else
                    blocks.set(World.getBlock(framefacting(pos,x,y,z)).getName().getString().replace("盆栽",""),{dx:x,dy:y,dz:z,df:(pos.floor),fo:(pos.faceOffset)})
            }
        }
        else if(World.getBlock(x,y,z).getName().getString()!="空气")
        {
            if(!blocks.has(World.getBlock(x,y,z).getName().getString()))
            {
                blocks.set(World.getBlock(x,y,z).getName().getString().replace("盆栽",""),{dx:x,dy:y,dz:z,df:(pos.floor),fo:(pos.faceOffset)})
            }
        }
        x+=facing;
    }
}
WestScanPos.forEach(pos => {
    WestscanRow(pos)
})

//查找&取货
// Chat.log(blocks.get("铁粒"))
xx=0.5
yy=0
zz=0.5
function Goto1(dx,dy,dz)//dx dy dz坐标xx yy zz偏移量
{
    gb_tt=Player.getPlayer().getPos()
    Chat.say("#goto "+dx.toString()+" "+dy.toString()+" "+dz.toString())
    while(Math.abs(gb_tt.getX()-dx-xx)>0.4 || Math.abs(gb_tt.getZ()-dz-zz)>0.4 || Math.abs(gb_tt.getY()-dy)>0)
    {
        gb_tt=Player.getPlayer().getPos()
    }
    Chat.say("#stop")
    Time.sleep(350)
    Player.getPlayer().setPos(dx+xx,dy,dz+zz)
}
let empty=[]
let clearly=[]
function getsome(pos,count,Id)
{
    // Time.sleep(100)
    Chat.log(Id)
    Goto1(pos.dx,77,-1432)
    Player.interactions().setTarget(pos.dx,pos.fo.y,pos.fo.z).interactBlock(pos.dx,pos.fo.y,pos.fo.z,"down", false)
    JsMacros.waitForEvent("OpenContainer");
    Chat.log("open")
    let slot=0;
    let sum=0;
    let slotiteminfo=[]
    let slotshulkerinfo=[]
    itemsum=0
    hasshulker=0
    while(slot<54)
    {
        if(Player.openInventory().getSlot(slot).getItemId().includes("shulker_box") && Player.openInventory().getSlot(slot).getNBT()!=null)
        {
            hasshulker=1;
            slotshulkerinfo.push({first:Player.openInventory().getSlot(slot),second:slot})
        }
        else if(Player.openInventory().getSlot(slot).getItemId()!="minecraft:air" && !(Player.openInventory().getSlot(slot).getItemId().includes("shulker_box")))
        {
            slotiteminfo.push({first:Player.openInventory().getSlot(slot),second:slot});         
            itemsum+=Player.openInventory().getSlot(slot).getCount();
        }
        slot++;
    }
    slotiteminfo.sort((x, y) => {
        return y.first.getCount()-x.first.getCount();
    });
    if(hasshulker)
    {
        slotshulkerinfo.sort((x,y) => {
            if(y.first.getNBT()!=null && x.first.getNBT()!=null)
                return y.first.getNBT().get("BlockEntityTag").get("Items").asListHelper().length()-x.first.getNBT().get("BlockEntityTag").get("Items").asListHelper().length();
            return x.second-y.second
        });
    }
    if((count>64 || itemsum<count) && hasshulker)
    {
        let j=0;
        while(sum<count && j<slotshulkerinfo.length && Player.openInventory().findFreeInventorySlot()!=-1)
        {
            Player.openInventory().quick(slotshulkerinfo[j].second)
            for(let i=0;i<slotshulkerinfo[j].first.getNBT().get("BlockEntityTag").get("Items").asListHelper().length();i++)
            {
                sum+=slotshulkerinfo[j].first.getNBT().get("BlockEntityTag").get("Items").asListHelper().get(i).asCompoundHelper().get("Count").asNumberHelper().asInt();
            }
            Time.sleep(30)
            j++;
        }
    }
    let j=0
    while(sum<count && j<slotiteminfo.length && Player.openInventory().findFreeInventorySlot()!=-1)
    {
        sum+=slotiteminfo[j].first.getCount();
        Player.openInventory().quick(slotiteminfo[j].second)
        j++;
    }
    if(sum<count && Player.openInventory().findFreeInventorySlot()==-1)
    {
        empty.push({id:Id,num:(count-sum)})
    }
    else if(sum<count)
    {
        clearly.push({id:Id,num:(count-sum)})
    }
    Player.openInventory().close();
    return ;
}
let lines=[]
try
{
    // 设置文件路径 (相对路径通常相对于 JsMacros 根目录)
    let filePath = "config/jsMacros/Macros/全物品/1.txt";
    let path = Paths.get(filePath);
    // 读取文件内容为字符串
    let content = Files.readString(path, StandardCharsets.UTF_8);
    Chat.log("文件读取成功：" + filePath);
    lines = content.trim().split(/\r?\n/);
    Chat.log("§a[解析] 总行数：" + lines.length);
}
catch (e)
{
    // 输出错误信息
    Chat.log("读取文件失败：" + e);
}
let all=new Map()
let nofind=[]
getthings=[]
for (let i = 0; i < lines.length; i++)
{
    let line = lines[i].trim();
    if (line === "") continue;
    let parts = line.split(/\s+/);
    if (parts.length >= 2) 
    {
        let first = parts[0];
        let second = parts[1];
        if(blocks.has(first))
        {
            // getsome(blocks.get(first),second,first)
            getthings.push({key:blocks.get(first).dx,fs:first,sd:second})
            all.set(first,second)
        }
        else
        {
            nofind.push(first)
        }
    }
}
getthings.sort((a,b) => {
    return a.key-b.key;
})
getthings.forEach(gt => {
    if(Player.openInventory().findFreeInventorySlot()!=-1)
    {
        getsome(blocks.get(gt.fs),gt.sd,gt.fs)        
    }
    else
    {
        empty.push({id:gt.fs,num:gt.sd})
    }
})
flag=0
let shulkerslot=0
let sm=0
function backing()
{
    Goto1(776,77.06250,-1422)
    if(!flag)
    {
        flag=1;
        Player.interactions().setTarget(773,76,-1421).interactBlock(773,76,-1421,"east",false)
        Time.sleep(2000)
    }
    do
    {
        if(shulkerslot==27)
        {
            shulkerslot=0;
            sm=0;
        }
        Player.interactions().setTarget(772,78,-1422).interactBlock(772,78,-1422,"east",false)
        JsMacros.waitForEvent("OpenContainer");
        for(let slot=27;slot<=62 && shulkerslot<=26;slot++)//0~26 27~62
        {
            if(all.has(Player.openInventory().getSlot(slot).getName().getString()) && !Player.openInventory().getSlot(slot).getItemId().includes("shulker_box"))
            {
                sm+=Player.openInventory().getSlot(slot).getCount()
                Player.openInventory().quick(slot)
                shulkerslot++;
            }
        }
        Player.openInventory().close()
        if(shulkerslot==27 && sm<1728)
        {
            Player.interactions().setTarget(773,76,-1421).interactBlock(773,76,-1421,"east",false)
            Time.sleep(2000)
        }
        if(sm==1728)
        {
            Time.sleep(2000)
        }
        Chat.log(shulkerslot)  
    }
    while(shulkerslot==27)
    Player.interactions().setTarget(773,76,-1422).interactBlock(773,76,-1422,"up",false)
    JsMacros.waitForEvent("OpenContainer");
    for(let slot=54;slot<=89;slot++)
    {
        if(Player.openInventory().getSlot(slot).getItemId().includes("shulker_box"))
        {
            Player.openInventory().quick(slot)
            Time.sleep(30)
        }
    }
    Player.openInventory().close()
    let nw=[]
    for(let i=0;i<empty.length;i++)
    {
        nw.push({id:empty[i].id,num:empty[i].num})
    }
    Chat.log(nw)
    empty=[]
    for(let i=0;i<nw.length;i++)
    {
        if(Player.openInventory().findFreeInventorySlot()!=-1)
        {
            getsome(blocks.get(nw[i].id),nw[i].num,nw[i].id)    
        }
        else
        {
            empty.push({id:nw[i].id,num:nw[i].num})
        }
    }
}
while(empty.length)
{
    Chat.log("refinding")
    backing()
}
backing()
if(shulkerslot!=0)
{
    Player.interactions().setTarget(773,76,-1421).interactBlock(773,76,-1421,"east",false)
    Time.sleep(2000)
}
Player.interactions().setTarget(773,76,-1422).interactBlock(773,76,-1422,"up",false)
JsMacros.waitForEvent("OpenContainer");
for(let slot=54;slot<=89;slot++)
{
    if(Player.openInventory().getSlot(slot).getItemId().includes("shulker_box"))
    {
        Player.openInventory().quick(slot)
        Time.sleep(30)
    }
}
Chat.log("done")

for(let i=0;i<clearly.length;i++)
{
    Chat.logColor("§c"+clearly[i].id+"不足，缺"+clearly[i].num)
}
for(let i=0;i<nofind.length;i++)
{
    Chat.logColor("§a"+nofind[i]+"未从物品列表中找到，可能是实体形式或全物品中不存在")
}

Player.interactions().clearTargetOverride()