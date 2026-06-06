const SECTIONS = {
  ops: {
    title: "Definición y operaciones",
    short: "Operaciones",
    theory: `
      <h3>Teoría para estudio · Definición y operaciones</h3>
      <p>Un vector puede pensarse como un segmento orientado. Queda determinado por tres elementos: <strong>módulo</strong>, <strong>dirección</strong> y <strong>sentido</strong>. En el registro geométrico se representa mediante una flecha: la longitud indica el módulo, la recta de acción indica la dirección y la punta de la flecha indica el sentido.</p>

      <h4>Vector libre, equipolente y ligado</h4>
      <p>Un <strong>vector libre</strong> queda definido por su módulo, dirección y sentido, pero no por su punto de aplicación. Por eso puede trasladarse paralelamente sin cambiar su identidad. Dos vectores son <strong>equipolentes</strong> cuando tienen el mismo módulo, dirección y sentido, aunque estén ubicados en distintos lugares del plano o del espacio. En cambio, un <strong>vector fijo o ligado</strong> tiene un punto de aplicación determinado; en ese caso no puede trasladarse sin modificar su significado.</p>

      <h4>Suma de vectores</h4>
      <p>Geométricamente, la suma puede construirse mediante la regla del triángulo o la regla del paralelogramo. Algebraicamente, si los vectores están expresados por componentes, la suma se realiza componente a componente:</p>
      <div class="formula"><span class="v">u</span> + <span class="v">v</span> = (u₁ + v₁, u₂ + v₂)</div>
      <div class="formula"><span class="v">u</span> + <span class="v">v</span> = (u₁ + v₁, u₂ + v₂, ..., uₙ + vₙ)</div>

      <h4>Multiplicación por un escalar</h4>
      <p>Si c es un escalar y u es un vector, entonces cu es un vector cuyo módulo es |c|·||u||. Si c&gt;0 conserva el sentido de u; si c&lt;0 conserva la dirección pero invierte el sentido; si c=0 se obtiene el vector nulo.</p>
      <div class="formula">c<span class="v">u</span> = (cu₁, cu₂, ..., cuₙ)</div>
      <div class="formula">||c<span class="v">u</span>|| = |c| · ||<span class="v">u</span>||</div>

      <h4>Módulo y vector unitario</h4>
      <p>El módulo o longitud de un vector se calcula a partir de sus componentes:</p>
      <div class="formula">||u|| = √(u₁² + u₂²)</div>
      <div class="formula">||u|| = √(u₁² + u₂² + ... + uₙ²)</div>
      <p>Si u≠0, el vector unitario en la dirección de u se obtiene dividiendo por su módulo:</p>
      <div class="formula">û = <span class="v">u</span> / ||<span class="v">u</span>||</div>

      <h4>Propiedades y descomposición canónica</h4>
      <p>La suma de vectores cumple propiedades como conmutatividad, asociatividad, existencia de neutro e inverso aditivo. La multiplicación por escalares cumple propiedades distributivas y de compatibilidad con el producto de escalares.</p>
      <p>En R³, todo vector puede escribirse como combinación de los versores fundamentales i, j y k:</p>
      <div class="formula"><span class="v">u</span> = (u₁,u₂,u₃) = u₁i + u₂j + u₃k</div>

      <h4>Vectores paralelos</h4>
      <p>Dos vectores son paralelos cuando sus componentes son proporcionales. En R³, para vectores no nulos:</p>
      <div class="formula">u₁/v₁ = u₂/v₂ = u₃/v₃</div>
      <p>Si la constante de proporcionalidad es positiva tienen el mismo sentido; si es negativa, sentidos opuestos.</p>
    `,
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
    theory: `
      <h3>Teoría para estudio · Producto escalar</h3>
      <p>El producto escalar permite relacionar dos vectores con el ángulo que forman. Es una operación que toma dos vectores y devuelve un número real.</p>

      <h4>Definición geométrica</h4>
      <p>Si u y v son vectores no nulos y θ es el ángulo entre ellos, se define:</p>
      <div class="formula"><span class="v">u</span> · <span class="v">v</span> = ||<span class="v">u</span>|| ||<span class="v">v</span>|| cos(θ)</div>
      <p>Esta definición no depende del sistema de coordenadas; por eso se dice que es una definición intrínseca.</p>

      <h4>Interpretación del signo</h4>
      <ul>
        <li>Si el ángulo es agudo, cos(θ)&gt;0 y entonces <span class="v">u</span> · <span class="v">v</span>&gt;0.</li>
        <li>Si el ángulo es recto, cos(θ)=0 y entonces <span class="v">u</span> · <span class="v">v</span>=0.</li>
        <li>Si el ángulo es obtuso, cos(θ)&lt;0 y entonces <span class="v">u</span> · <span class="v">v</span>&lt;0.</li>
      </ul>

      <h4>Ortogonalidad</h4>
      <p>Dos vectores son ortogonales cuando el ángulo entre ellos es de 90°. A partir de la definición geométrica:</p>
      <div class="formula"><span class="v">u</span> ⟂ <span class="v">v</span> ⇔ <span class="v">u</span> · <span class="v">v</span> = 0</div>

      <h4>Módulo y ángulo</h4>
      <p>El producto escalar permite expresar el módulo de un vector como:</p>
      <div class="formula">||<span class="v">u</span>|| = √(<span class="v">u</span> · <span class="v">u</span>)</div>
      <p>También permite calcular el ángulo entre dos vectores no nulos:</p>
      <div class="formula">cos(θ) = (<span class="v">u</span> · <span class="v">v</span>) / (||<span class="v">u</span>|| ||<span class="v">v</span>||)</div>

      <h4>Producto escalar por componentes</h4>
      <p>En un sistema cartesiano ortogonal, el producto escalar puede calcularse sumando los productos de componentes homónimas:</p>
      <div class="formula"><span class="v">u</span> · <span class="v">v</span> = u₁v₁ + u₂v₂</div>
      <div class="formula"><span class="v">u</span> · <span class="v">v</span> = u₁v₁ + u₂v₂ + u₃v₃</div>
      <div class="formula"><span class="v">u</span> · <span class="v">v</span> = Σ uᵢvᵢ</div>

      <h4>Propiedades</h4>
      <ul>
        <li>Conmutativa: <span class="v">u</span> · <span class="v">v</span> = <span class="v">v</span> · <span class="v">u</span>.</li>
        <li>Linealidad: <span class="v">u</span> · (<span class="v">v</span> + <span class="v">w</span>)=<span class="v">u</span> · <span class="v">v</span>+<span class="v">u</span> · <span class="v">w</span>.</li>
        <li>Homogeneidad: c(<span class="v">u</span> · <span class="v">v</span>)=(c<span class="v">u</span>) · <span class="v">v</span>=<span class="v">u</span> · (c<span class="v">v</span>).</li>
        <li>Positividad: <span class="v">v</span> · <span class="v">v</span>≥0, con igualdad si y solo si <span class="v">v</span>=0.</li>
      </ul>

      <h4>Proyección ortogonal</h4>
      <p>La proyección de v sobre u representa la parte de v que queda sobre la dirección de u:</p>
      <div class="formula">proyᵤ(<span class="v">v</span>) = (<span class="v">u</span> · <span class="v">v</span> / ||<span class="v">u</span>||²) <span class="v">u</span></div>
      <div class="formula">compᵤ(<span class="v">v</span>) = (<span class="v">u</span> · <span class="v">v</span> / ||<span class="v">u</span>||)</div>

      <h4>Aplicaciones</h4>
      <p>El producto escalar se utiliza para calcular trabajo mecánico, potencia instantánea, ángulos, proyecciones y condiciones de ortogonalidad. Por ejemplo:</p>
      <div class="formula">W = <span class="v">F</span> · <span class="v">d</span></div>
      <div class="formula">P = <span class="v">F</span> · <span class="v">v</span></div>
    `,
    activities: [
      {
        title: "Actividad 1 de 6 · Signo del producto escalar",
        type: "dotInteractive",
        canvas: "dotFourQuadrants",
        prompt: "Mové u y v en los cuatro cuadrantes. Indicá el signo de <span class="v">u</span> · <span class="v">v</span> para la posición actual.",
        options: ["Positivo", "Negativo", "Cero"],
        answerMode: "currentDotSign",
        hint: "Agudo: positivo. Recto: cero. Obtuso: negativo.",
        solution: "El signo depende de cos(θ): positivo si el ángulo es agudo, nulo si es recto, negativo si es obtuso."
      },
      {
        title: "Actividad 2 de 6 · Cálculo por componentes",
        type: "numeric",
        prompt: "Sean u=(3,-1) y v=(5,3). Calculá <span class="v">u</span> · <span class="v">v</span>.",
        answer: 12,
        placeholder: "Ej.: 12",
        hint: "Usá <span class="v">u</span> · <span class="v">v</span> = u1v1 + u2v2.",
        solution: "<span class="v">u</span> · <span class="v">v</span>=3(5)+(-1)(3)=15-3=12."
      },
      {
        title: "Actividad 3 de 6 · Ángulo entre vectores",
        type: "numericApprox",
        prompt: "Sean u=(3,-1) y v=(5,3). Ingresá el ángulo aproximado en grados.",
        answer: 71,
        tolerance: 2,
        placeholder: "Ej.: 71",
        hint: "Primero calculá cos(θ)=<span class="v">u</span> · <span class="v">v</span>/(||u||||v||).",
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
        hint: "Calculá <span class="v">u</span> · <span class="v">v</span>, luego ||u||², y usá proy_u(v)=(<span class="v">u</span> · <span class="v">v</span>/||u||²)u.",
        solution: "<span class="v">u</span> · <span class="v">v</span>=3 y ||u||²=14. Entonces proy_u(v)=(3/14)u=(-3/7,9/14,3/14)."
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
      ["Si <span class="v">u</span> · <span class="v">v</span>=0, entonces:", ["u y v son ortogonales", "u y v son iguales", "u y v son opuestos", "u y v no existen"], 0, "Producto escalar nulo implica ortogonalidad."],
      ["Si el ángulo entre u y v es agudo, <span class="v">u</span> · <span class="v">v</span> es:", ["Positivo", "Negativo", "Cero", "Indefinido"], 0, "cos(θ)>0 para θ agudo."],
      ["Fórmula por componentes en R2:", ["u1v1+u2v2", "u1+v1", "u1v2-u2v1", "||u||||v||senθ"], 0, "Es la suma de productos homónimos."],
      ["El producto escalar permite calcular:", ["Ángulos", "Solamente áreas", "Determinantes 3x3 únicamente", "Solo vectores unitarios"], 0, "Permite calcular ángulos mediante cosθ."],
      ["La proyección de v sobre u apunta sobre la dirección de:", ["u", "v", "k", "ninguna"], 0, "proy_u(v) está sobre la dirección de u."],
      ["Si <span class="v">u</span> · <span class="v">v</span><0, el ángulo es:", ["Obtuso", "Agudo", "Recto", "Cero"], 0, "Producto negativo corresponde a ángulo obtuso."],
      ["El trabajo mecánico puede expresarse como:", ["F·d", "F×d", "F+d", "F/d"], 0, "El trabajo se modela con producto escalar."]
    ]
  },
  cross: {
    title: "Producto vectorial",
    short: "Vectorial",
    theory: `
      <h3>Teoría para estudio · Producto vectorial</h3>
      <p>El producto vectorial es una operación entre dos vectores de R³ cuyo resultado es otro vector. Aparece naturalmente en problemas de rotación, momento de una fuerza, normales a superficies y cálculo de áreas.</p>

      <h4>Motivación física</h4>
      <p>En mecánica, el momento de una fuerza respecto de un punto se modela mediante:</p>
      <div class="formula"><span class="v">M</span> = <span class="v">r</span> × <span class="v">F</span></div>
      <p>El vector momento es perpendicular al plano determinado por r y F, y su sentido representa la tendencia de rotación.</p>

      <h4>Definición geométrica</h4>
      <p>El producto vectorial de dos vectores u y v es un vector w = u × v definido por:</p>
      <div class="formula">||<span class="v">w</span>|| = ||<span class="v">u</span>|| ||<span class="v">v</span>|| sen(θ)</div>
      <p>Su dirección es perpendicular al plano determinado por u y v. Su sentido se determina mediante la regla de la mano derecha o regla del sacacorchos.</p>

      <h4>Producto vectorial en coordenadas</h4>
      <p>Si u=(u₁,u₂,u₃) y v=(v₁,v₂,v₃), entonces:</p>
      <div class="formula"><span class="v">u</span> × <span class="v">v</span> = (u₂v₃-u₃v₂)i − (u₁v₃-u₃v₁)j + (u₁v₂-u₂v₁)k</div>
      <p>También se puede calcular mediante un determinante simbólico:</p>
      <div class="formula"><span class="v">u</span> × <span class="v">v</span> = | i&nbsp; j&nbsp; k ; u₁&nbsp;u₂&nbsp;u₃ ; v₁&nbsp;v₂&nbsp;v₃ |</div>

      <h4>Propiedades geométricas</h4>
      <ul>
        <li><span class="v">u</span>×<span class="v">v</span> es ortogonal tanto a u como a v.</li>
        <li>||<span class="v">u</span>×<span class="v">v</span>|| = ||u|| ||v|| sen(θ).</li>
        <li><span class="v">u</span>×<span class="v">v</span> = 0 si y solo si u y v son paralelos o alguno es nulo.</li>
        <li>||<span class="v">u</span>×<span class="v">v</span>|| representa el área del paralelogramo generado por u y v.</li>
      </ul>

      <h4>Propiedades algebraicas</h4>
      <ul>
        <li>Anticonmutatividad: <span class="v">u</span>×<span class="v">v</span> = −(v×u).</li>
        <li>Distributividad: u×(v+w)=<span class="v">u</span>×<span class="v">v</span>+u×w.</li>
        <li>Homogeneidad: c(<span class="v">u</span>×<span class="v">v</span>)=(cu)×v=u×(cv).</li>
        <li>v×<span class="v">v</span>=0.</li>
      </ul>

      <h4>Distancia de un punto a una recta</h4>
      <p>Si una recta está determinada por los puntos X y R, y P es un punto exterior, se definen:</p>
      <div class="formula"><span class="v">u</span> = R − X, &nbsp;&nbsp; <span class="v">v</span> = P − X</div>
      <p>La distancia de P a la recta puede calcularse como:</p>
      <div class="formula">d = ||<span class="v">u</span> × <span class="v">v</span>|| / ||<span class="v">u</span>||</div>
    `,
    activities: [
      {
        title: "Actividad 1 de 6 · Interpretación geométrica",
        type: "choice",
        visual: "cross3d",
        prompt: "El resultado de <span class="v">u</span>×<span class="v">v</span> es:",
        options: ["Un escalar", "Un vector perpendicular al plano de u y v", "Una recta", "Un ángulo"],
        answer: "Un vector perpendicular al plano de u y v",
        hint: "Recordá que el producto vectorial solo se define de este modo en R3.",
        solution: "<span class="v">u</span>×<span class="v">v</span> es un vector perpendicular a u y a v."
      },
      {
        title: "Actividad 2 de 6 · Sentido del vector resultante",
        type: "choice",
        prompt: "El sentido de <span class="v">u</span>×<span class="v">v</span> se determina mediante:",
        options: ["Regla de la mano derecha", "Regla de Cramer", "Teorema de Pitágoras", "Ley de Ohm"],
        answer: "Regla de la mano derecha",
        hint: "Pensá en el giro desde u hacia v.",
        solution: "El sentido se determina con la regla de la mano derecha o del sacacorchos."
      },
      {
        title: "Actividad 3 de 6 · Cálculo por determinante",
        type: "vector",
        prompt: "Sean u=(1,3,4) y v=(2,7,-5). Calculá <span class="v">u</span>×<span class="v">v</span>.",
        answer: [-43,13,1],
        placeholder: "Ej.: (-43,13,1)",
        hint: "Primera componente: u2v3-u3v2.",
        solution: "<span class="v">u</span>×<span class="v">v</span>=(3(-5)-4(7), 4(2)-1(-5), 1(7)-3(2))=(-43,13,1)."
      },
      {
        title: "Actividad 4 de 6 · Verificar perpendicularidad",
        type: "numeric",
        prompt: "Con u=(1,3,4) y <span class="v">u</span>×<span class="v">v</span>=(-43,13,1), calculá u·(<span class="v">u</span>×<span class="v">v</span>).",
        answer: 0,
        placeholder: "Ej.: 0",
        hint: "El producto vectorial debe ser ortogonal a u.",
        solution: "u·(<span class="v">u</span>×<span class="v">v</span>)=1(-43)+3(13)+4(1)=-43+39+4=0."
      },
      {
        title: "Actividad 5 de 6 · Área del paralelogramo",
        type: "numericApprox",
        visual: "areaParallelogram",
        prompt: "Si ||<span class="v">u</span>×<span class="v">v</span>||=10, ¿cuál es el área del paralelogramo generado por u y v?",
        answer: 10,
        tolerance: 0.01,
        placeholder: "Ej.: 10",
        hint: "El módulo del producto vectorial representa el área.",
        solution: "Área=||<span class="v">u</span>×<span class="v">v</span>||=10."
      },
      {
        title: "Actividad 6 de 6 · Distancia de un punto a una recta",
        type: "numericApprox",
        prompt: "Para X=(0,0,0), R=(2,2,0), P=(2,4,0), calculá d=||<span class="v">u</span>×<span class="v">v</span>||/||u||.",
        answer: 1.414,
        tolerance: 0.05,
        placeholder: "Ej.: 1.414 o sqrt(2)",
        hint: "u=R-X=(2,2,0), v=P-X=(2,4,0).",
        solution: "<span class="v">u</span>×<span class="v">v</span>=(0,0,4), ||<span class="v">u</span>×<span class="v">v</span>||=4, ||u||=√8. Entonces d=4/√8=√2."
      }
    ],
    quiz: [
      ["El producto vectorial de dos vectores en R3 produce:", ["Un vector", "Un escalar", "Un número complejo", "Una parábola"], 0, "Produce un vector."],
      ["<span class="v">u</span>×<span class="v">v</span> es perpendicular a:", ["u y v", "solo u", "solo v", "ninguno"], 0, "Es perpendicular a ambos."],
      ["Si u y v son paralelos, entonces <span class="v">u</span>×<span class="v">v</span>:", ["Es 0", "Es 1", "Es u", "Es v"], 0, "El área del paralelogramo es cero."],
      ["El módulo ||<span class="v">u</span>×<span class="v">v</span>|| representa:", ["Área", "Volumen", "Ángulo", "Proyección"], 0, "Representa área del paralelogramo."],
      ["<span class="v">u</span>×<span class="v">v</span> = -(v×u) expresa:", ["Anticonmutatividad", "Conmutatividad", "Asociatividad", "Identidad"], 0, "El producto vectorial cambia de signo al invertir el orden."],
      ["El sentido de <span class="v">u</span>×<span class="v">v</span> se determina con:", ["Mano derecha", "Regla de tres", "Sarrus siempre", "Pitágoras"], 0, "Regla de la mano derecha."],
      ["La distancia punto-recta puede calcularse con:", ["||<span class="v">u</span>×<span class="v">v</span>||/||u||", "<span class="v">u</span> · <span class="v">v</span>", "u+v", "||u||+||v||"], 0, "Se usa el área/base."],
      ["El producto vectorial se asocia en física con:", ["Momento o torque", "Temperatura", "Masa", "Presión absoluta solamente"], 0, "Torque M=r×F."]
    ]
  },
  mixed: {
    title: "Producto mixto",
    short: "Mixto",
    theory: `
      <h3>Teoría para estudio · Producto mixto</h3>
      <p>El producto mixto combina el producto vectorial y el producto escalar. Dado tres vectores u, v y w en R³, se define como:</p>
      <div class="formula">[<span class="v">u</span>,<span class="v">v</span>,<span class="v">w</span>] = <span class="v">u</span> · (<span class="v">v</span> × <span class="v">w</span>)</div>
      <p>El resultado es un escalar.</p>

      <h4>Interpretación geométrica</h4>
      <p>El producto vectorial <span class="v">v</span>×<span class="v">w</span> genera un vector perpendicular al plano determinado por v y w. Su módulo representa el área del paralelogramo de base. Al hacer el producto escalar con u, se incorpora la altura orientada respecto de esa base.</p>
      <div class="formula">V = |<span class="v">u</span> · (<span class="v">v</span> × <span class="v">w</span>)|</div>
      <p>Por lo tanto, el valor absoluto del producto mixto representa el volumen del paralelepípedo determinado por u, v y w.</p>

      <h4>Coplanaridad</h4>
      <p>Si los tres vectores son coplanares, el volumen del paralelepípedo es cero. Por eso:</p>
      <div class="formula"><span class="v">u</span> · (<span class="v">v</span> × <span class="v">w</span>) = 0 ⇔ <span class="v">u</span>, <span class="v">v</span> y <span class="v">w</span> son coplanares</div>

      <h4>Desarrollo algebraico</h4>
      <p>El producto mixto puede calcularse mediante un determinante 3×3 formado con las componentes de los tres vectores:</p>
      <div class="formula"><span class="v">u</span> · (<span class="v">v</span> × <span class="v">w</span>) = det [ <span class="v">u</span> ; <span class="v">v</span> ; <span class="v">w</span> ]</div>

      <h4>Propiedad cíclica</h4>
      <p>Las permutaciones cíclicas conservan el valor del producto mixto:</p>
      <div class="formula"><span class="v">u</span> · (<span class="v">v</span> × <span class="v">w</span>) = <span class="v">v</span> · (<span class="v">w</span> × <span class="v">u</span>) = <span class="v">w</span> · (<span class="v">u</span> × <span class="v">v</span>)</div>
      <p>En cambio, al intercambiar dos vectores se cambia el signo.</p>

      <h4>Regla mnemotécnica</h4>
      <p>Recorrer los vectores en sentido cíclico conserva el signo del producto mixto. Recorrerlos en sentido contrario cambia el signo.</p>

      <h4>Aplicaciones</h4>
      <p>El producto mixto se utiliza para calcular volúmenes, determinar coplanaridad y analizar orientaciones en el espacio.</p>
    `,
    activities: [
      {
        title: "Actividad 1 de 6 · Estructura del producto mixto",
        type: "choice",
        visual: "mixed3d",
        prompt: "El producto mixto se escribe como:",
        options: ["u·(<span class="v">v</span>×<span class="v">w</span>)", "u×(v·w)", "u+v+w", "<span class="v">u</span> · <span class="v">v</span>·w sin cruz"],
        answer: "u·(<span class="v">v</span>×<span class="v">w</span>)",
        hint: "Primero aparece un producto vectorial y luego un producto escalar.",
        solution: "El producto mixto es [u,v,w]=u·(<span class="v">v</span>×<span class="v">w</span>)."
      },
      {
        title: "Actividad 2 de 6 · Cálculo paso a paso",
        type: "numeric",
        prompt: "Sean u=(1,4,-7), v=(2,-1,4), w=(0,-9,18). Calculá u·(<span class="v">v</span>×<span class="v">w</span>).",
        answer: 0,
        placeholder: "Ej.: 0",
        hint: "Calculá primero <span class="v">v</span>×<span class="v">w</span> y luego hacé el producto escalar con u.",
        solution: "El producto mixto vale 0."
      },
      {
        title: "Actividad 3 de 6 · Interpretación del volumen",
        type: "choice",
        prompt: "El valor |u·(<span class="v">v</span>×<span class="v">w</span>)| representa:",
        options: ["Volumen del paralelepípedo", "Área de un triángulo", "Longitud de u", "Ángulo entre u y v"],
        answer: "Volumen del paralelepípedo",
        hint: "El producto vectorial da área de base y el producto escalar incorpora altura.",
        solution: "|u·(<span class="v">v</span>×<span class="v">w</span>)| representa el volumen del paralelepípedo generado por los tres vectores."
      },
      {
        title: "Actividad 4 de 6 · Coplanaridad",
        type: "choice",
        prompt: "Si u·(<span class="v">v</span>×<span class="v">w</span>)=0, entonces los tres vectores son:",
        options: ["Coplanares", "Unitarios", "Iguales", "No nulos siempre"],
        answer: "Coplanares",
        hint: "Si el volumen es cero, no se forma un paralelepípedo con volumen.",
        solution: "Producto mixto cero implica volumen cero, por lo tanto los vectores son coplanares."
      },
      {
        title: "Actividad 5 de 6 · Regla cíclica",
        type: "choice",
        prompt: "¿Cuál expresión conserva el valor de u·(<span class="v">v</span>×<span class="v">w</span>)?",
        options: ["v·(<span class="v">w</span>×<span class="v">u</span>)", "v·(u×w)", "u·(w×v)", "-u·(<span class="v">v</span>×<span class="v">w</span>)"],
        answer: "v·(<span class="v">w</span>×<span class="v">u</span>)",
        hint: "Las permutaciones cíclicas conservan el signo.",
        solution: "u·(<span class="v">v</span>×<span class="v">w</span>)=v·(<span class="v">w</span>×<span class="v">u</span>)=w·(<span class="v">u</span>×<span class="v">v</span>)."
      },
      {
        title: "Actividad 6 de 6 · Volumen aplicado",
        type: "numericApprox",
        prompt: "Si u·(<span class="v">v</span>×<span class="v">w</span>)=-12, ¿cuál es el volumen del paralelepípedo?",
        answer: 12,
        tolerance: 0.01,
        placeholder: "Ej.: 12",
        hint: "El volumen es el valor absoluto del producto mixto.",
        solution: "V=|-12|=12."
      }
    ],
    quiz: [
      ["El producto mixto da como resultado:", ["Un escalar", "Un vector", "Una matriz", "Un plano"], 0, "El producto mixto es un número."],
      ["|u·(<span class="v">v</span>×<span class="v">w</span>)| representa:", ["Volumen", "Área", "Módulo de u", "Proyección"], 0, "Representa volumen."],
      ["Si el producto mixto es cero:", ["Los vectores son coplanares", "Los vectores son unitarios", "El plano no existe", "Todos valen cero"], 0, "Volumen cero implica coplanaridad."],
      ["Primero en u·(<span class="v">v</span>×<span class="v">w</span>) se calcula:", ["<span class="v">v</span>×<span class="v">w</span>", "<span class="v">u</span> · <span class="v">v</span>", "<span class="v">u</span>×<span class="v">v</span>", "u+w"], 0, "Primero se resuelve el producto vectorial."],
      ["Las permutaciones cíclicas:", ["Conservan el signo", "Siempre dan cero", "Cambian módulo", "No se permiten"], 0, "Conservan el valor del producto mixto."],
      ["El signo del producto mixto depende de:", ["La orientación de los vectores", "Solo del módulo", "La unidad de medida", "La suma"], 0, "El signo expresa orientación."],
      ["El producto mixto puede escribirse como determinante de:", ["Tres filas de componentes", "Dos filas", "Una matriz identidad solamente", "Un vector unitario"], 0, "Se calcula como determinante 3x3."],
      ["Para verificar coplanaridad conviene calcular:", ["u·(<span class="v">v</span>×<span class="v">w</span>)", "u+v+w", "||u||", "u-v"], 0, "Si da cero, son coplanares."]
    ]
  }
};
