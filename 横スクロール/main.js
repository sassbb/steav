  let input_key = new Array();

  window.addEventListener("keydown",handlekeydown);
  function handlekeydown(e){
      input_key[e.keyCode] = true;
  }

  window.addEventListener("keyup",handlekeyup);
  function handlekeyup(e){;
      input_key[e.keyCode] = false;
  }


  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const canvas_width = 1080;
  const canvas_height =720;
  canvas.width = canvas_width;
  canvas.height = canvas_height;
  //スティーブ設定
  let CHARA_SPEED =10;

  let x = 0;
  let y = 450;
  //上下方向
  let vy =0 ;
  let isJump =false;


  //地面
  const groundLevel = 450;

  //スピード
  const minSpeed =10;
  const maxSpeed =30;

  
  function generateRandomSpeed(){
    return Math.random()*(maxSpeed - minSpeed )+minSpeed;

  }

  // 敵キャラクターの初期速度をランダムに生成
  let tekiSpeed = generateRandomSpeed();

  // ゲームオブジェクトの初期速度をランダムに生成
  let gemuSpeed = generateRandomSpeed();

  // ゲームオブジェクトの初期速度をランダムに生成
  let soniSpeed = 150;

  let boxSpeed = 5;
  

  //カズヤ
  let tekiX =canvas_width;
  let tekiY =450;
  const tekiwidth = 200;
  const tekiHeight = 125;

  //ゲムヲ
  let gemuX =canvas_width;
  let gemuY =200;
  const gemuwidth = 200;
  const gemuHeight = 100;
  window.addEventListener("load",update);

  //ソニック
  let soniX =canvas_width;
  let soniY =300;
  const soniwidth = 200;
  const soniHeight = 100;
  window.addEventListener("load",update);

   //hungrybox
   let boxX =canvas_width;
   let boxY =Math.random()*(500-200)+200;
   const boxwidth = 100;
   const boxHeight = 100;
   window.addEventListener("load",update); 

   //ban
     let banX =500;
     let banY =500;
     const banwidth = 1280;
     const banHeight = 720;
    

      //スティーブの画像
      let img = new Image();
      img.src = "images/torokko.png";

      //カズヤの画像
      const tekiImage = new Image();
      tekiImage.src = "images/kazuya.png";

      //ゲムヲの画像
      const gemuImage = new Image();
      gemuImage.src = "images/gemuwo.png";

      //ソニックの画像
      const soniImage = new Image();
      soniImage.src = "images/sonic.png";

      //hungryboxの画像
      const boxImage = new Image();
      boxImage.src = "images/box.png";  

      //ホームラン音
      const audio = new Audio();
      audio.src = "images/homerun.mp3";
      
      //ハンボの叫び声
      const boxb = new Audio();
      boxb.src ="images/box.wav";
      //bgm
      const bgm = new Audio();
      bgm.src = "images/maikuramusic.mp3";
      //スコア
      let score =0;

      //止まる音
      function stopBGM() {
        bgm.pause();}

      //BAN画像
      const banImage =new Image();
      banImage.src = "images/ban.png";
      
      audio.volume = 0.4;
      bgm.volume = 0.4;
      boxb.volume =0.2;


  function update(){


    ctx.clearRect(0,0,canvas_width,canvas_height);

  bgm.play();
  


    //ジャンプ
  const jumpHeight =25;
  const gravity =1.5;
//速さ
  tekiX -=tekiSpeed; 
  ctx.drawImage (tekiImage, tekiX,tekiY,tekiwidth,tekiHeight);

  gemuX -=gemuSpeed; 
  ctx.drawImage (gemuImage, gemuX,gemuY,gemuwidth,gemuHeight);

  soniX -=soniSpeed; 
  ctx.drawImage (soniImage, soniX,soniY,soniwidth,soniHeight);

  boxX -=boxSpeed;
  ctx.drawImage (boxImage, boxX,boxY,boxwidth,boxHeight);
      
  
      let updatedX = x;
      let updatedY = y;


      if(gemuX + gemuwidth<0){
        gemuX = canvas_width;
        gemuSpeed = generateRandomSpeed(); 
      }

      if(tekiX + tekiwidth<0){
            tekiX = canvas_width;
            tekiSpeed = generateRandomSpeed();
          }

      if (soniX + soniwidth < 0 ) {
            soniX = Math.random() * (20000 - 5000) + 5000;
            soniSpeed =150;
          }

      if (boxX + boxwidth < 0 ) {
             boxX = Math.random() * (5000 - 3000) + 3000;
            boxSpeed =5;
          }
  
          
          if (input_key[37]) {
            updatedX = x - CHARA_SPEED;
          }
          if (input_key[32] && !isJump) {
            vy = -jumpHeight;
            isJump = true;
          }
          if (input_key[39]) {
            updatedX = x + CHARA_SPEED;
          }
        
          if(isJump){
              updatedY =y +vy;
              vy = vy + gravity;
          }

          if(updatedY>=groundLevel){
            updatedY=groundLevel;
            vy = 0;
            isJump = false;
          }
  
          if(updatedX + 180>= tekiX &&updatedX < tekiX + tekiwidth &&
            tekiY-124 <= updatedY ){{
              //当たった処理 
              handleCollision();
            }}
          
          if(updatedX + 160>= gemuX &&updatedX < gemuX + 
            gemuwidth &&gemuY >= updatedY-124)
            {{
              //当たった処理 
              handleCollision2();
            }}
          

           if(updatedX + 160>= soniX &&updatedX < soniX + 
             soniwidth &&soniY >= updatedY-124)
             {{
               //当たった処理 
               handleCollision3();
            }}

            if(updatedX + 160>= boxX &&updatedX < boxX + 
              50 &&boxY >= updatedY-124)
              {{
                //当たった処理 
                handleCollision4();
             }}

          
    
      x = updatedX;
      y = updatedY;

        
          
      
      ctx.drawImage (img, x,y,200,124);

    window.requestAnimationFrame(update);

          }

  function handleCollision() {
    tekiX = canvas_width; // 敵を画面外に移動させる
    audio.currentTime = 0; 　
    audio.play();  
    score += 100; // スコアを増やす（適宜増える数値を変更してください）
    updateScore(); 
    tekiSpeed = generateRandomSpeed(); // 新しいランダムな速度を生成する

  }
  function handleCollision2() {
    gemuX = canvas_width; // 敵を画面外に移動させる
    audio.currentTime = 0; 　
    audio.play(); 
    score += 150; // スコアを増やす（適宜増える数値を変更してください）
    updateScore();  
    gemuSpeed = generateRandomSpeed(); // 新しいランダムな速度を生成する

  }

  function handleCollision3() {
    // 敵を画面外に移動させる
   soniX = Math.random() * (20000 - 5000) + 5000;
    audio.currentTime = 0; 　
    audio.play(); 
    score += 200; // スコアを増やす（適宜増える数値を変更してください）
    updateScore(); 
    soniSpeed =150;
    }



    function handleCollision4() {
      boxX=x;
      boxY=y;
      gemuSpeed=0;
      tekiSpeed=0;
      soniSpeed=0;
      CHARA_SPEED =0;  
       
      boxb.play();
      stopBGM(); 
      
      ctx.drawImage (banImage, -110,0,banwidth,banHeight);
 
        }    
    

  function updateScore() {
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = "Score: " + score; 
    
  }


  window.addEventListener("load", update);





  





