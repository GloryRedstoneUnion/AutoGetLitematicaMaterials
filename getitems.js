lst=[]
Client.getRegisteredItems().forEach(item => {
    lst.push(item.getId())
})
Chat.createCommandBuilder("getitem")
    .itemArg("ItemId")
    .intArg("Count")
    .executes(JavaWrapper.methodToJavaAsync((e) => {
        const item = e.getArg("ItemId");
        const count = e.getArg("Count")
        main(item,count)
        return true;
    }))
    .register();
function main(ItemInfo,Counts)
{
    //East sn
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
    World.getEntities("minecraft:item_frame").forEach(entity => {
        let pos = entity.getBlockPos()
        let item = entity.getItem()
        itemFrameMap.set(pos2str(pos), item)
    })
    wall=853
    function EastscanRow(pos)
    {
        x=pos.startPos.getX()
        y=pos.startPos.getY()
        z=pos.startPos.getZ()
        while(x<=wall)
        {
            if(itemFrameMap.has(pos2str(framefacting(pos,x,y,z))))
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
    
    
    
    //West ns
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
        x=pos.startPos.getX()
        y=pos.startPos.getY()
        z=pos.startPos.getZ()
        while(x>=wall)
        {
            if(itemFrameMap.has(pos2str(framefacting(pos,x,y,z))))
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
    if(!blocks.has(ItemInfo.getName().getString()))
    {
        Chat.log("§a全物品没有或者以实体形式存在")
        return ;
    }
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
    pos=blocks.get(ItemInfo.getName().getString())
    count=Counts
    function getsome()
    {
        Goto1(pos.dx,77,-1432)
        Player.interactions().interactBlock(pos.dx,pos.fo.y,pos.fo.z,"down", false)
        JsMacros.waitForEvent("OpenContainer");
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
            Chat.log("§c背包满了，没拿够")
            return ;
        }
        else if(sum<count)
        {
            Chat.log("§c没货了")
            return ;
        }
        Player.openInventory().close();
        return ;
    }
    getsome()
    return ;
}
event.stopListener = JavaWrapper.methodToJava(() => {
    Chat.unregisterCommand("getitem");
    return Client;
});