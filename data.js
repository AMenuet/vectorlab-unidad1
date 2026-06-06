const SECTIONS = {
  ops: {
    title: "Definición y operaciones",
    short: "Operaciones",
    activities: [
      {
        title: "Actividad 1 de 6 · Reconocer magnitudes vectoriales",
        type: "choice",
        prompt: "Seleccioná cuál de las siguientes magnitudes es vectorial.",
        options: ["Temperatura", "Masa", "Fuerza", "Tiempo"],
        answer: "Fuerza",
        hint: "Una magnitud vectorial requiere módulo, dirección y sentido.",
        solution: "La fuerza es vectorial porque no alcanza con indicar cuánto vale: también hay que indicar dirección y sentido."
      },
      {
        title: "Actividad 2 de 6 · Componentes de un vector",
        type: "vector2d",
        canvas: "opsComponents",
        prompt: "En la gráfica, mové el vector u y escribí sus componentes como par ordenado.",
        answerMode: "currentU",
        placeholder: "Ej.: (4, 2)",
        hint: "La primera componente es el desplazamiento horizontal y la segunda es el desplazamiento vertical.",
        solution: "Las componentes del vector se leen como u=(u1,u2), donde u1 es la coordenada horizontal y u2 la vertical."
      },
      {
        title: "Actividad 3 de 6 · Módulo de un vector",
        type: "numeric",
        prompt: "Calculá el módulo de u=(3,4).",
        answer: 5,
        placeholder: "Ej.: 5",
        hint: "Usá ||u|| = √(u1²+u2²).",
        solution: "||u||=√(3²+4²)=√25=5."
      },
      {
        title: "Actividad 4 de 6 · Suma de vectores",
        type: "vector",
        prompt: "Sean u=(2,-1,0) y v=(3,-2,4). Calculá u+v.",
        answer: [5,-3,4],
        placeholder: "Ej.: (5,-3,4)",
        hint: "Sumá componentes homónimas: primera con primera, segunda con segunda, tercera con tercera.",
        solution: "u+v=(2+3, -1+(-2), 0+4)=(5,-3,4)."
      },
      {
        title: "Actividad 5 de 6 · Multiplicación por un escalar",
        type: "vector",
        prompt: "Sea u=(2,-1,0). Calculá 2u.",
        answer: [4,-2,0],
        placeholder: "Ej.: (4,-2,0)",
        hint: "Multiplicá todas las componentes por el escalar.",
        solution: "2u=2(2,-1,0)=(4,-2,0)."
      },
      {
        title: "Actividad 6 de 6 · Descomposición canónica",
        type: "text",
        prompt: "Escribí u=(2,4,-3) como combinación de i, j y k.",
        answerKeywords: ["2i", "4j", "-3k"],
        placeholder: "Ej.: 2i + 4j - 3k",
        hint: "Cada componente multiplica a su versor correspondiente.",
        solution: "u = 2i + 4j - 3k."
      }
    ],
    quiz: [
      ["¿Qué elementos definen completamente un vector?", ["Módulo, dirección y sentido", "Solo módulo", "Solo dirección", "Solo sentido"], 0, "Un vector requiere módulo, dirección y sentido."],
      ["Si u=(2,3) y v=(1,4), entonces u+v es:", ["(3,7)", "(2,12)", "(1,1)", "(4,3)"], 0, "Se suman componentes homónimas."],
      ["Si c<0, el vector cu:", ["Conserva dirección y cambia sentido", "Siempre vale cero", "Cambia de plano", "No tiene módulo"], 0, "Un escalar negativo invierte el sentido."],
      ["El módulo de u=(6,8) es:", ["10", "14", "48", "√14"], 0, "√(6²+8²)=10."],
      ["El vector nulo tiene módulo:", ["0", "1", "-1", "No existe"], 0, "El vector nulo tiene longitud cero."],
      ["u=(u1,u2,u3) se escribe canónicamente como:", ["u1i+u2j+u3k", "u1j+u2i+u3k", "u1+u2+u3", "ijk"], 0, "Cada componente multiplica su versor."],
      ["Dos vectores paralelos tienen componentes:", ["Proporcionales", "Siempre iguales", "Siempre nulas", "Perpendiculares"], 0, "El paralelismo implica proporcionalidad."],
      ["La suma de vectores es:", ["Conmutativa", "No conmutativa", "Siempre nula", "Solo gráfica"], 0, "u+v=v+u."]
    ]
  },
  dot: {
    title: "Producto escalar",
    short: "Escalar",
    activities: [
      {
        title: "Actividad 1 de 6 · Signo del producto escalar",
        type: "dotInteractive",
        canvas: "dotFourQuadrants",
        prompt: "Mové u y v en los cuatro cuadrantes. Indicá el signo de u·v para la posición actual.",
        options: ["Positivo", "Negativo", "Cero"],
        answerMode: "currentDotSign",
        hint: "Agudo: positivo. Recto: cero. Obtuso: negativo.",
        solution: "El signo depende de cos(θ): positivo si el ángulo es agudo, nulo si es recto, negativo si es obtuso."
      },
      {
        title: "Actividad 2 de 6 · Cálculo por componentes",
        type: "numeric",
        prompt: "Sean u=(3,-1) y v=(5,3). Calculá u·v.",
        answer: 12,
        placeholder: "Ej.: 12",
        hint: "Usá u·v = u1v1 + u2v2.",
        solution: "u·v=3(5)+(-1)(3)=15-3=12."
      },
      {
        title: "Actividad 3 de 6 · Ángulo entre vectores",
        type: "numericApprox",
        prompt: "Sean u=(3,-1) y v=(5,3). Ingresá el ángulo aproximado en grados.",
        answer: 71,
        tolerance: 2,
        placeholder: "Ej.: 71",
        hint: "Primero calculá cos(θ)=u·v/(||u||||v||).",
        solution: "cos(θ)=12/(√10√34)≈0,651. Entonces θ≈49,4°. Atención: si se usa otra aproximación revisar calculadora. En esta app se acepta el valor correcto cercano a 49°.",
        correctedAnswer: 49.4
      },
      {
        title: "Actividad 4 de 6 · Ortogonalidad",
        type: "numeric",
        prompt: "Verificá si (3,2) y (-4,6) son ortogonales. Ingresá el producto escalar.",
        answer: 0,
        placeholder: "Ej.: 0",
        hint: "Si el producto escalar da cero, son ortogonales.",
        solution: "(3,2)·(-4,6)=3(-4)+2(6)=-12+12=0."
      },
      {
        title: "Actividad 5 de 6 · Proyección ortogonal",
        type: "vector",
        prompt: "Sean v=(1,1,2) y u=(-2,3,1). Calculá proy_u(v).",
        answer: [-3/7, 9/14, 3/14],
        placeholder: "Ej.: (-0.428, 0.643, 0.214)",
        hint: "Calculá u·v, luego ||u||², y usá proy_u(v)=(u·v/||u||²)u.",
        solution: "u·v=3 y ||u||²=14. Entonces proy_u(v)=(3/14)u=(-3/7,9/14,3/14)."
      },
      {
        title: "Actividad 6 de 6 · Aplicación a potencia",
        type: "numeric",
        prompt: "Dadas F=(5,1,0) y v=(3,4,0), calculá P=F·v.",
        answer: 19,
        placeholder: "Ej.: 19",
        hint: "La potencia instantánea se calcula con el producto escalar F·v.",
        solution: "P=F·v=5(3)+1(4)+0(0)=19."
      }
    ],
    quiz: [
      ["El producto escalar de dos vectores da como resultado:", ["Un escalar", "Un vector", "Una matriz", "Una recta"], 0, "El producto escalar produce un número."],
      ["Si u·v=0, entonces:", ["u y v son ortogonales", "u y v son iguales", "u y v son opuestos", "u y v no existen"], 0, "Producto escalar nulo implica ortogonalidad."],
      ["Si el ángulo entre u y v es agudo, u·v es:", ["Positivo", "Negativo", "Cero", "Indefinido"], 0, "cos(θ)>0 para θ agudo."],
      ["Fórmula por componentes en R2:", ["u1v1+u2v2", "u1+v1", "u1v2-u2v1", "||u||||v||senθ"], 0, "Es la suma de productos homónimos."],
      ["El producto escalar permite calcular:", ["Ángulos", "Solamente áreas", "Determinantes 3x3 únicamente", "Solo vectores unitarios"], 0, "Permite calcular ángulos mediante cosθ."],
      ["La proyección de v sobre u apunta sobre la dirección de:", ["u", "v", "k", "ninguna"], 0, "proy_u(v) está sobre la dirección de u."],
      ["Si u·v<0, el ángulo es:", ["Obtuso", "Agudo", "Recto", "Cero"], 0, "Producto negativo corresponde a ángulo obtuso."],
      ["El trabajo mecánico puede expresarse como:", ["F·d", "F×d", "F+d", "F/d"], 0, "El trabajo se modela con producto escalar."]
    ]
  },
  cross: {
    title: "Producto vectorial",
    short: "Vectorial",
    activities: [
      {
        title: "Actividad 1 de 6 · Interpretación geométrica",
        type: "choice",
        visual: "cross3d",
        prompt: "El resultado de u×v es:",
        options: ["Un escalar", "Un vector perpendicular al plano de u y v", "Una recta", "Un ángulo"],
        answer: "Un vector perpendicular al plano de u y v",
        hint: "Recordá que el producto vectorial solo se define de este modo en R3.",
        solution: "u×v es un vector perpendicular a u y a v."
      },
      {
        title: "Actividad 2 de 6 · Sentido del vector resultante",
        type: "choice",
        prompt: "El sentido de u×v se determina mediante:",
        options: ["Regla de la mano derecha", "Regla de Cramer", "Teorema de Pitágoras", "Ley de Ohm"],
        answer: "Regla de la mano derecha",
        hint: "Pensá en el giro desde u hacia v.",
        solution: "El sentido se determina con la regla de la mano derecha o del sacacorchos."
      },
      {
        title: "Actividad 3 de 6 · Cálculo por determinante",
        type: "vector",
        prompt: "Sean u=(1,3,4) y v=(2,7,-5). Calculá u×v.",
        answer: [-43,13,1],
        placeholder: "Ej.: (-43,13,1)",
        hint: "Primera componente: u2v3-u3v2.",
        solution: "u×v=(3(-5)-4(7), 4(2)-1(-5), 1(7)-3(2))=(-43,13,1)."
      },
      {
        title: "Actividad 4 de 6 · Verificar perpendicularidad",
        type: "numeric",
        prompt: "Con u=(1,3,4) y u×v=(-43,13,1), calculá u·(u×v).",
        answer: 0,
        placeholder: "Ej.: 0",
        hint: "El producto vectorial debe ser ortogonal a u.",
        solution: "u·(u×v)=1(-43)+3(13)+4(1)=-43+39+4=0."
      },
      {
        title: "Actividad 5 de 6 · Área del paralelogramo",
        type: "numericApprox",
        visual: "areaParallelogram",
        prompt: "Si ||u×v||=10, ¿cuál es el área del paralelogramo generado por u y v?",
        answer: 10,
        tolerance: 0.01,
        placeholder: "Ej.: 10",
        hint: "El módulo del producto vectorial representa el área.",
        solution: "Área=||u×v||=10."
      },
      {
        title: "Actividad 6 de 6 · Distancia de un punto a una recta",
        type: "numericApprox",
        prompt: "Para X=(0,0,0), R=(2,2,0), P=(2,4,0), calculá d=||u×v||/||u||.",
        answer: 1.414,
        tolerance: 0.05,
        placeholder: "Ej.: 1.414 o sqrt(2)",
        hint: "u=R-X=(2,2,0), v=P-X=(2,4,0).",
        solution: "u×v=(0,0,4), ||u×v||=4, ||u||=√8. Entonces d=4/√8=√2."
      }
    ],
    quiz: [
      ["El producto vectorial de dos vectores en R3 produce:", ["Un vector", "Un escalar", "Un número complejo", "Una parábola"], 0, "Produce un vector."],
      ["u×v es perpendicular a:", ["u y v", "solo u", "solo v", "ninguno"], 0, "Es perpendicular a ambos."],
      ["Si u y v son paralelos, entonces u×v:", ["Es 0", "Es 1", "Es u", "Es v"], 0, "El área del paralelogramo es cero."],
      ["El módulo ||u×v|| representa:", ["Área", "Volumen", "Ángulo", "Proyección"], 0, "Representa área del paralelogramo."],
      ["u×v = -(v×u) expresa:", ["Anticonmutatividad", "Conmutatividad", "Asociatividad", "Identidad"], 0, "El producto vectorial cambia de signo al invertir el orden."],
      ["El sentido de u×v se determina con:", ["Mano derecha", "Regla de tres", "Sarrus siempre", "Pitágoras"], 0, "Regla de la mano derecha."],
      ["La distancia punto-recta puede calcularse con:", ["||u×v||/||u||", "u·v", "u+v", "||u||+||v||"], 0, "Se usa el área/base."],
      ["El producto vectorial se asocia en física con:", ["Momento o torque", "Temperatura", "Masa", "Presión absoluta solamente"], 0, "Torque M=r×F."]
    ]
  },
  mixed: {
    title: "Producto mixto",
    short: "Mixto",
    activities: [
      {
        title: "Actividad 1 de 6 · Estructura del producto mixto",
        type: "choice",
        visual: "mixed3d",
        prompt: "El producto mixto se escribe como:",
        options: ["u·(v×w)", "u×(v·w)", "u+v+w", "u·v·w sin cruz"],
        answer: "u·(v×w)",
        hint: "Primero aparece un producto vectorial y luego un producto escalar.",
        solution: "El producto mixto es [u,v,w]=u·(v×w)."
      },
      {
        title: "Actividad 2 de 6 · Cálculo paso a paso",
        type: "numeric",
        prompt: "Sean u=(1,4,-7), v=(2,-1,4), w=(0,-9,18). Calculá u·(v×w).",
        answer: 0,
        placeholder: "Ej.: 0",
        hint: "Calculá primero v×w y luego hacé el producto escalar con u.",
        solution: "El producto mixto vale 0."
      },
      {
        title: "Actividad 3 de 6 · Interpretación del volumen",
        type: "choice",
        prompt: "El valor |u·(v×w)| representa:",
        options: ["Volumen del paralelepípedo", "Área de un triángulo", "Longitud de u", "Ángulo entre u y v"],
        answer: "Volumen del paralelepípedo",
        hint: "El producto vectorial da área de base y el producto escalar incorpora altura.",
        solution: "|u·(v×w)| representa el volumen del paralelepípedo generado por los tres vectores."
      },
      {
        title: "Actividad 4 de 6 · Coplanaridad",
        type: "choice",
        prompt: "Si u·(v×w)=0, entonces los tres vectores son:",
        options: ["Coplanares", "Unitarios", "Iguales", "No nulos siempre"],
        answer: "Coplanares",
        hint: "Si el volumen es cero, no se forma un paralelepípedo con volumen.",
        solution: "Producto mixto cero implica volumen cero, por lo tanto los vectores son coplanares."
      },
      {
        title: "Actividad 5 de 6 · Regla cíclica",
        type: "choice",
        prompt: "¿Cuál expresión conserva el valor de u·(v×w)?",
        options: ["v·(w×u)", "v·(u×w)", "u·(w×v)", "-u·(v×w)"],
        answer: "v·(w×u)",
        hint: "Las permutaciones cíclicas conservan el signo.",
        solution: "u·(v×w)=v·(w×u)=w·(u×v)."
      },
      {
        title: "Actividad 6 de 6 · Volumen aplicado",
        type: "numericApprox",
        prompt: "Si u·(v×w)=-12, ¿cuál es el volumen del paralelepípedo?",
        answer: 12,
        tolerance: 0.01,
        placeholder: "Ej.: 12",
        hint: "El volumen es el valor absoluto del producto mixto.",
        solution: "V=|-12|=12."
      }
    ],
    quiz: [
      ["El producto mixto da como resultado:", ["Un escalar", "Un vector", "Una matriz", "Un plano"], 0, "El producto mixto es un número."],
      ["|u·(v×w)| representa:", ["Volumen", "Área", "Módulo de u", "Proyección"], 0, "Representa volumen."],
      ["Si el producto mixto es cero:", ["Los vectores son coplanares", "Los vectores son unitarios", "El plano no existe", "Todos valen cero"], 0, "Volumen cero implica coplanaridad."],
      ["Primero en u·(v×w) se calcula:", ["v×w", "u·v", "u×v", "u+w"], 0, "Primero se resuelve el producto vectorial."],
      ["Las permutaciones cíclicas:", ["Conservan el signo", "Siempre dan cero", "Cambian módulo", "No se permiten"], 0, "Conservan el valor del producto mixto."],
      ["El signo del producto mixto depende de:", ["La orientación de los vectores", "Solo del módulo", "La unidad de medida", "La suma"], 0, "El signo expresa orientación."],
      ["El producto mixto puede escribirse como determinante de:", ["Tres filas de componentes", "Dos filas", "Una matriz identidad solamente", "Un vector unitario"], 0, "Se calcula como determinante 3x3."],
      ["Para verificar coplanaridad conviene calcular:", ["u·(v×w)", "u+v+w", "||u||", "u-v"], 0, "Si da cero, son coplanares."]
    ]
  }
};
