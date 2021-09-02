let pFrenteCima = { x: 6, y: 0 };
let pFrenteBaixo = { x: 3, y: 15 };
let pMedioCima = { x: 80, y: 0 };
let pMedioBaixo = { x: 60, y: 80 };
let pTrasBaixo = { x: 120, y: 80 };
let pFrenteSuperBaixo = { x: -10 - (pFrenteCima.x - pFrenteBaixo.x), y: 80 };
let botoes = [];
let botoesVisiveis = true;

let posicoes;

function setup() {
  createCanvas(400, 400);
  posicoes = {x:width/2, y:height/2};
  botoes.push(new botao(pFrenteCima, posicoes.x, posicoes.y));
  botoes.push(new botao(pFrenteBaixo, posicoes.x, posicoes.y));
  botoes.push(new botao(pMedioCima, posicoes.x, posicoes.y));
  botoes.push(new botao(pMedioBaixo, posicoes.x, posicoes.y));
  botoes.push(new botao(pTrasBaixo, posicoes.x, posicoes.y));
  botoes.push(new botao(pFrenteSuperBaixo, posicoes.x, posicoes.y));
}

function draw() {
  visualizaBike();
  for (var i = 0; i < botoes.length; i++) {
    botoes[i].display();
  }
  fill(0);
  text("Mova os botões e personalize sua bicicleta.\nTecle ESPAÇO para esconder os botões.",20,height-30);
}

function visualizaBike() {
  background(220);
  
  visualizaRodas(botoes[5]);
  visualizaRodas(botoes[4]);
  visualizaPedivela(botoes[3],0);
  
  strokeWeight(3.5);
  strokeCap(SQUARE);
  
  //canote
  stroke(150);
  beginShape(LINES);
  vertex(botoes[2].bx, botoes[2].by);
  vertex(botoes[2].bx+(botoes[2].bx-botoes[3].bx)/4, botoes[2].by -25);
  endShape();
  
  //quadro: head,top,seat,down,seatstay,chainstay
  stroke(250, 195, 23);
  beginShape(LINES);
  vertex(botoes[0].bx, botoes[0].by);
  vertex(botoes[1].bx, botoes[1].by);
  endShape();
  beginShape(LINES);
  vertex(botoes[0].bx, botoes[0].by);
  vertex(botoes[2].bx, botoes[2].by);
  endShape();
  beginShape(LINES);
  vertex(botoes[2].bx, botoes[2].by);
  vertex(botoes[3].bx, botoes[3].by);
  endShape();
  beginShape(LINES);
  vertex(botoes[3].bx, botoes[3].by);
  vertex(botoes[1].bx, botoes[1].by);
  endShape();
  beginShape(LINES);
  vertex(botoes[2].bx, botoes[2].by);
  vertex(botoes[4].bx, botoes[4].by);
  endShape();
  beginShape(LINES);
  vertex(botoes[3].bx, botoes[3].by);
  vertex(botoes[4].bx, botoes[4].by);
  endShape();
  fill(250, 195, 23);
  ellipse(botoes[3].bx,botoes[3].by, 5,5);
  
  //top-headtube e garfo
  beginShape(LINES);
  vertex(botoes[0].bx, botoes[0].by);
  vertex(botoes[0].bx+(botoes[0].bx-botoes[1].bx)/5, botoes[0].by -7);
  endShape();
  beginShape(LINES);
  vertex(botoes[1].bx, botoes[1].by);
  vertex(botoes[5].bx, botoes[5].by);
  endShape();
  
  //mesa
  stroke(0);
  beginShape(LINES);
  vertex(botoes[0].bx +(botoes[0].bx-botoes[1].bx)/5, botoes[0].by -7);
  vertex(botoes[0].bx-12+(botoes[0].bx-botoes[1].bx)/5, botoes[0].by -10);
  endShape();
  //selim
  beginShape();
  vertex(botoes[2].bx+(botoes[2].bx-botoes[3].bx)/4 -18, botoes[2].by -25);
  vertex(botoes[2].bx+(botoes[2].bx-botoes[3].bx)/4 +4, botoes[2].by -25);
  vertex(botoes[2].bx+(botoes[2].bx-botoes[3].bx)/4 +12, botoes[2].by -28);
  endShape();
  //guidao
  fill(0);
  ellipse(botoes[0].bx-12+(botoes[0].bx-botoes[1].bx)/5,botoes[0].by -10, 5,5);
  
  visualizaPedivela(botoes[3],600);
}

function visualizaPedivela(botao, offset){
  stroke(150);
  line(botao.bx,botao.by,
       botao.bx+cos(offset-frameCount/10)*20,
       botao.by+sin(offset-frameCount/10)*20);
  stroke(0);
  line(botao.bx+cos(offset-frameCount/10)*20,
       botao.by+sin(offset-frameCount/10)*20,
       botao.bx+cos(offset-frameCount/10)*20 -8,
       botao.by+sin(offset-frameCount/10)*20);
}

function visualizaRodas(botao){
  //raios
  var tamanhoRodas = 100;
  var tamanhoAros = 50;
  stroke(150);
  for(var i=0; i<16; i++){
    line(botao.bx,botao.by,
         botao.bx+cos(-frameCount/10)*tamanhoAros,
         botao.by+sin(-frameCount/10)*tamanhoAros);
    line(botao.bx,botao.by,
         botao.bx+cos(600-frameCount/10)*tamanhoAros,
         botao.by+sin(600-frameCount/10)*tamanhoAros);
    line(botao.bx,botao.by,
         botao.bx+cos(300-frameCount/10)*tamanhoAros,
         botao.by+sin(300-frameCount/10)*tamanhoAros);
    line(botao.bx,botao.by,
         botao.bx+cos(900-frameCount/10)*tamanhoAros,
         botao.by+sin(900-frameCount/10)*tamanhoAros);
  }
  //arosPneu
  stroke(0);
  noFill();
  ellipse(botao.bx, botao.by,tamanhoRodas,tamanhoRodas);
}

class botao {
  constructor(objP, posx, posy) {
    this.bx = posx - pTrasBaixo.x/2 + objP.x;
    this.by = posy + objP.y;
    this.botaoSize = 15 ;
    this.overBotao = false;
    this.locked = false;
    this.xOffset = 0.0;
    this.yOffset = 0.0;
  }

  display() {
    if (dist(mouseX, mouseY, this.bx, this.by) < this.botaoSize / 2) {
      this.overBotao = true;
      if (!this.locked) {
      noStroke();
      fill(255,255,255,200);
      }
    } else {
      noStroke();
      fill(255,255,255,125);
      this.overBotao = false;
    }
  
    if(botoesVisiveis){ellipse(this.bx, this.by, this.botaoSize, this.botaoSize);}
  }
}

function mousePressed() {
  for (var i = 0; i < botoes.length; i++) {
    if (botoes[i].overBotao) {
      botoes[i].locked = true;
      noStroke();
      fill(255,255,255,200);
    } else {
      botoes[i].locked = false;
    }
    botoes[i].xOffset = mouseX - botoes[i].bx;
    botoes[i].yOffset = mouseY - botoes[i].by;
  }
}

function mouseDragged() {
  for (var i = 0; i < botoes.length; i++) {
    if (botoes[i].locked) {
      botoes[i].bx = mouseX - botoes[i].xOffset;
      botoes[i].by = mouseY - botoes[i].yOffset;
    }
  }
}

function mouseReleased() {
  for (var i = 0; i < botoes.length; i++) {
    botoes[i].locked = false;
  }
}

function keyPressed() {
  if (keyCode == '32') {
    botoesVisiveis = !botoesVisiveis;
  }
}
