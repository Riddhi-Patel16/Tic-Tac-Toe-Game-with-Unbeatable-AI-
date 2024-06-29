let popup=document.querySelector(".pop-up");
function setup(e){
    popup.style.visibility="visible";
    e.target.style.visibility="hidden";
}
let players=false,player=false,level=undefined;
function start2(event)
{
    let id=event.target.getAttribute("id");
    if(id=="2player")
        {
            if(player)
            {
                document.querySelectorAll(".grid .image-box").forEach((btn)=>{
                    btn.innerText='';
                    btn.classList.remove("win2");
                    })            
                    player=false;
                    turn='X';
                    count=0;
                    winindex=-1;
            }
            players=true;
            submit();
        }
        else
        {
            if(players)
                {
                    document.querySelectorAll(".grid .image-box").forEach((btn)=>{
                        btn.innerText='';
                        btn.classList.remove("win2");
                        })
                        players=false;
                        turn='X';
                        count=0;
                        winindex=-1;    
                }
            player=true;
            let level2=document.querySelector("#level");
            level2.style.visibility="visible";
            level2.style.height="auto";
        }
}
function submit(){
    let level2=document.querySelector("#level");
    if(level!=undefined && level!=level2.value)
        {
            document.querySelectorAll(".grid .image-box").forEach((btn)=>{
                btn.innerText='';
                btn.classList.remove("win2");
                })
                players=false;
                turn='X';
                count=0;
                winindex=-1;    
        }
    if(player)
    {
        level=level2.value;
    
    }
    let main=document.querySelector(".main");
    main.style.visibility="hidden";
    level2.style.visibility="hidden";
    level2.style.height="0px";
    main.style.height="0px";
    main.style.marginTop="0px";
    popup.style.visibility="hidden";
    let main2=document.querySelector(".main2");
    main2.style.visibility="visible";
    main2.style.height="100vh";
    main2.style.marginTop="10px";
    Gamemode();
}

let msg=document.querySelector(".msg");
let winpattern=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let turn = 'X';
let btns = document.querySelectorAll(".grid .image-box");
let count = 0;
let winindex=-1;
function Gamemode(){
if(players && count<=9)
{ 
let msg2;
if (turn == 'X') {
    msg2= "X Player 1 Turn";
} else {
    msg2= "O player 2 Turn";
}
start(msg2); // Initial call to display the first player's turn
}
else if(player && count<=9)
{
    start("X Your Turn");
}
}
function checkwin()
    {
        for(let [index,pattern] of winpattern.entries())
            {
                let f=btns[pattern[0]].innerText;
                let s=btns[pattern[1]].innerText;
                let t=btns[pattern[2]].innerText;                        
                if(f!='' && s!='' && t!='')
                    {
                        if(f==s && s==t)
                            {
                                winindex=index;
                                return true;
                            }
                    }
            }
            return false;
    }

btns.forEach((btn,index)=>{
    btn.addEventListener('click',()=>{turnclick(index)});
})
async function turnclick(i)
{
    if(players && count<9)
    {
        let tag=document.createElement("span");
        tag.innerText=turn;
        tag.classList.add("win");
        console.log("i"+i);
        if(btns[i].innerText=='')
        {btns[i].appendChild(tag);
        count++;
        let win=checkwin();
        if(!win && count<9)
        {
            if(turn=='X')
                {
                    turn='O';
                    start(turn + " Player "+ "2"+" Turn");
                }
            else
           {
             turn='X';
             start(turn + " Player 1"+" Turn");
           }
        }
        else if(win)
        {
            winner();
            count=11;
        }
        else
        {
            draw();
            count=11;
        }
    }
    }
    if(player && count<9)
    {
        let tag=document.createElement("span");
        tag.innerText=turn;
        tag.classList.add("win");
        if(btns[i].innerText=='')
       { btns[i].appendChild(tag);
        count++;
        let win=checkwin();
        if(win)
        {
                winner();
                count=11;
        }
        else if(count<9)
        {
            turn='O';
            start("AI Turn");
            await wait();
            let j=aispot();
            console.log("after tem");
            let tag=document.createElement("span");
            tag.innerText=turn;
            tag.classList.add("win");
            btns[j].appendChild(tag);
            count++;
            let win=checkwin();
            if(win)
            {
                    winner();
                    count=11;
            }
            else if(count<9)
                {
                    turn='X';
                    start("X Your Turn");
                }
                else
                {
                    draw();
                    count=11;
                }
        }
        else
        {
            draw();
            count=11;
        }
    }
    }
}
function  wait()
{
    let tem=new Promise((resolve,reject)=>{
        setTimeout(()=>{        resolve(2);
},2000);
    })
    // await tem;
    return tem;
}
function aispot()
{
    let i=-1;
    let count=check();
    if(count.length!=0)
        {
            if(level=="easy")
            {
            i=count[Math.floor(Math.random()*count.length)];
            } 
            else if(level=="medium")
            {
                for(let j=0;j<count.length;j++)
                    {
                        btns[count[j]].innerText='O';
                        if(checkwin())
                            {
                                i=count[j];
                            }
                            btns[count[j]].innerText='';
                    }
                    if(i==-1)
                       {
                    for(let j=0;j<count.length;j++)
                        {
                            btns[count[j]].innerText='X';
                            if(checkwin())
                                {
                                    i=count[j];
                                }
                                btns[count[j]].innerText='';
                        }
                    }
                    if(i==-1)
                    i=count[Math.floor(Math.random()*count.length)];
            }  
            else
            {
                let bestscore=1000;
                let move=-1;
                for(let j=0;j<count.length;j++)
                {
                    btns[count[j]].innerText='O';
                    let score=minimax(false);
                    btns[count[j]].innerText='';
                    if(score<bestscore)
                        {
                            if(score==-10)
                            {bestscore=score;
                            move=j;
                            break;
                            }
                            else
                           { bestscore=score
                            move=j;
                           }
                        }
                }
               i=count[move];
            }

        }
        return i;
}

function minimax(ismini)
{
    let win=checkwin();
    let action=check();
    if(win)
    {
        if(ismini)
            return 10;
        else
        return -10;
    }
    if(action.length==0)
        return 0;
    if(ismini)
    {
        let bestscore=1000;
        for(let j=0;j<action.length;j++)
        {
            btns[action[j]].innerText='O';
            let score=minimax(false);
            btns[action[j]].innerText='';
            if(score<bestscore)
                {
                    if(score==-10)
                    {bestscore=score;
                        break;
                    }
                    else
                    bestscore=score
                }
        }
        return bestscore;
    }
    else
    {
        let bestscore=-1000;
                for(let i=0;i<action.length;i++)
                {
                    btns[action[i]].innerText='X';
                    let score=minimax(true);
                    btns[action[i]].innerText='';
                    if(score>bestscore)
                        {
                            if(score==10)
                            {bestscore=score;
                                break;
                            }
                            else
                        bestscore=score
                        }
                }
                return bestscore;
    }
}
function check()
{
    let count=[];
    btns.forEach((btn,index)=>{
        if(btn.innerText=='')
            count.push(index);
    })
    return count;
}
function draw()
{
    let msg="Game Draw";
    let audio=new Audio("Audio/winner.mp3");
    audio.play();
    start("Game Over");
    setTimeout(()=>{
        document.querySelectorAll(".grid .image-box").forEach((btn)=>{btn.classList.add("win2")});
        start(msg)},2000);
}
function winner()
{
    let msg;
    let audio=new Audio("Audio/winner.mp3");
    audio.play();
    start("Game Over");
    if (turn == 'X' && players) {
        msg= "X Player 1 Win";
    } else if(players){
        msg= "O player 2 Win";
    }
    else if(turn=='O')
    {
        msg="AI Win";
    }
    else
    {
        msg="You Win";
    }
    setTimeout(()=>{
        btns[winpattern[winindex][0]].classList.add("win2");
        btns[winpattern[winindex][1]].classList.add("win2");
        btns[winpattern[winindex][2]].classList.add("win2");
        start(msg)},2000);
}
function start(msg2) {
   
    msg.innerText = msg2;

}
function reset()
{
   document.querySelectorAll(".grid .image-box").forEach((btn)=>{
    btn.innerText='';
    btn.classList.remove("win2");
    })
    turn='X';
    count=0;
    winindex=-1;
   Gamemode();
}
function back()
{
    let main=document.querySelector(".main");
    main.style.visibility="visible";
    main.style.height="100vh";
    main.style.marginTop="40px";
    popup.style.visibility="visible";
    let main2=document.querySelector(".main2");
    main2.style.visibility="hidden";
    main2.style.height="0px";
    main2.style.marginTop="0px";
}
