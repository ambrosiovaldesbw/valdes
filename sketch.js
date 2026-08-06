let imagenes = [];
let imagenCargada = [false, false, false, false, false];

let proyectoSeleccionado = -1;

let nombres = [
  "Proyecto 1",
  "Proyecto 2",
  "Proyecto 3",
  "Proyecto 4",
  "Proyecto 5"
];

let descripciones = [
  "Descripción del primer proyecto.",
  "Descripción del segundo proyecto.",
  "Descripción del tercer proyecto.",
  "Descripción del cuarto proyecto.",
  "Descripción del quinto proyecto."
];

function preload() {
  for (let i = 0; i < 5; i++) {
    let nombreArchivo = "proyecto" + (i + 1) + ".jpg";

    imagenes[i] = loadImage(
      nombreArchivo,

      function () {
        imagenCargada[i] = true;
        console.log(nombreArchivo + " cargada correctamente");
      },

      function () {
        imagenCargada[i] = false;
        console.log("No se pudo cargar " + nombreArchivo);
      }
    );
  }
}

function setup() {
  createCanvas(1000, 700);

  imageMode(CENTER);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(240);

  if (proyectoSeleccionado === -1) {
    mostrarMenu();
  } else {
    mostrarProyecto(proyectoSeleccionado);
  }
}

function mostrarMenu() {
  fill(25);
  noStroke();

  textSize(34);
  text("MIS PROYECTOS", width / 2, 55);

  fill(90);
  textSize(16);
  text(
    "Selecciona uno de los 5 proyectos",
    width / 2,
    95
  );

  let anchoBoton = 160;
  let altoBoton = 230;
  let separacion = 185;
  let inicioX = width / 2 - separacion * 2;

  for (let i = 0; i < 5; i++) {
    let x = inicioX + i * separacion;
    let y = height / 2;

    let mouseEncima =
      mouseX > x - anchoBoton / 2 &&
      mouseX < x + anchoBoton / 2 &&
      mouseY > y - altoBoton / 2 &&
      mouseY < y + altoBoton / 2;

    stroke(mouseEncima ? 20 : 180);
    strokeWeight(mouseEncima ? 3 : 1);

    fill(mouseEncima ? 220 : 255);

    rect(
      x,
      y,
      anchoBoton,
      altoBoton,
      18
    );

    noStroke();

    // Mostrar imagen solo si cargó correctamente
    if (imagenCargada[i] && imagenes[i]) {
      image(
        imagenes[i],
        x,
        y - 30,
        130,
        130
      );
    } else {
      mostrarImagenNoEncontrada(
        x,
        y - 30,
        130,
        130
      );
    }

    fill(25);
    textSize(17);
    text(
      nombres[i],
      x,
      y + 65
    );

    fill(100);
    textSize(13);
    text(
      "Presiona " + (i + 1),
      x,
      y + 92
    );
  }

  fill(70);
  textSize(15);

  text(
    "También puedes usar las teclas 1, 2, 3, 4 y 5",
    width / 2,
    height - 70
  );
}

function mostrarProyecto(numeroProyecto) {
  background(20);

  // Mostrar imagen grande solo si existe
  if (
    imagenCargada[numeroProyecto] &&
    imagenes[numeroProyecto]
  ) {
    image(
      imagenes[numeroProyecto],
      width / 2,
      height / 2 - 60,
      650,
      420
    );
  } else {
    mostrarImagenNoEncontrada(
      width / 2,
      height / 2 - 60,
      650,
      420
    );
  }

  // Caja inferior
  noStroke();
  fill(0, 210);

  rect(
    width / 2,
    height - 105,
    700,
    155,
    20
  );

  fill(255);
  textSize(28);

  text(
    nombres[numeroProyecto],
    width / 2,
    height - 145
  );

  fill(210);
  textSize(16);

  text(
    descripciones[numeroProyecto],
    width / 2,
    height - 105
  );

  fill(170);
  textSize(14);

  text(
    "Presiona ESC o haz clic en CERRAR",
    width / 2,
    height - 70
  );

  mostrarBotonCerrar();
}

function mostrarImagenNoEncontrada(x, y, ancho, alto) {
  push();

  rectMode(CENTER);

  stroke(160);
  strokeWeight(2);

  fill(225);

  rect(
    x,
    y,
    ancho,
    alto,
    12
  );

  noStroke();
  fill(90);

  textAlign(CENTER, CENTER);
  textSize(ancho > 200 ? 20 : 12);

  text(
    "Imagen no encontrada",
    x,
    y - 10
  );

  fill(120);
  textSize(ancho > 200 ? 14 : 10);

  text(
    "Revisa el nombre del archivo",
    x,
    y + 18
  );

  pop();
}

function mostrarBotonCerrar() {
  let cerrarX = width - 90;
  let cerrarY = 45;

  let mouseSobreCerrar =
    mouseX > cerrarX - 60 &&
    mouseX < cerrarX + 60 &&
    mouseY > cerrarY - 20 &&
    mouseY < cerrarY + 20;

  noStroke();

  fill(mouseSobreCerrar ? 210 : 255);

  rect(
    cerrarX,
    cerrarY,
    120,
    42,
    12
  );

  fill(20);
  textSize(15);

  text(
    "CERRAR",
    cerrarX,
    cerrarY
  );
}

function mousePressed() {
  if (proyectoSeleccionado === -1) {
    let anchoBoton = 160;
    let altoBoton = 230;
    let separacion = 185;
    let inicioX = width / 2 - separacion * 2;

    for (let i = 0; i < 5; i++) {
      let x = inicioX + i * separacion;
      let y = height / 2;

      let dentroDelBoton =
        mouseX > x - anchoBoton / 2 &&
        mouseX < x + anchoBoton / 2 &&
        mouseY > y - altoBoton / 2 &&
        mouseY < y + altoBoton / 2;

      if (dentroDelBoton) {
        proyectoSeleccionado = i;
        break;
      }
    }
  } else {
    let cerrarX = width - 90;
    let cerrarY = 45;

    let dentroDeCerrar =
      mouseX > cerrarX - 60 &&
      mouseX < cerrarX + 60 &&
      mouseY > cerrarY - 20 &&
      mouseY < cerrarY + 20;

    if (dentroDeCerrar) {
      proyectoSeleccionado = -1;
    }
  }
}

function keyPressed() {
  if (key === "1") {
    proyectoSeleccionado = 0;
  }

  if (key === "2") {
    proyectoSeleccionado = 1;
  }

  if (key === "3") {
    proyectoSeleccionado = 2;
  }

  if (key === "4") {
    proyectoSeleccionado = 3;
  }

  if (key === "5") {
    proyectoSeleccionado = 4;
  }

  if (keyCode === ESCAPE) {
    proyectoSeleccionado = -1;
  }
}