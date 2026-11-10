export interface OptionItem {
  id: 'A' | 'B' | 'C' | 'D';
  es: string;
  hy: string;
}

export interface QuestionItem {
  id: number;
  questionEs: string;
  questionHy: string;
  options: OptionItem[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanationEs: string;
  explanationHy: string;
}

export const SECRET_WORD = 'PORTERIA';
export const SECRET_WORD_TRANSLATION_HY = 'ԴԱՐՊԱՍ';
export const SECRET_WORD_MEANING = 'Portería (Դարպաս / Goal / Goalmouth) — Ֆուտբոլային դարպասը, որը պաշտպանում է դարպասապահը (el portero):';

export const QUESTIONS_DATA: QuestionItem[] = [
  {
    id: 1,
    questionEs: '¿Quién protege la portería?',
    questionHy: 'Ո՞վ է պաշտպանում դարպասը։',
    options: [
      { id: 'A', es: 'El delantero', hy: 'Հարձակվողը' },
      { id: 'B', es: 'El portero', hy: 'Դարպասապահը' },
      { id: 'C', es: 'El entrenador', hy: 'Մարզիչը' },
      { id: 'D', es: 'El árbitro', hy: 'Մրցավարը' },
    ],
    correctAnswer: 'B',
    explanationEs: 'El portero (o guardameta) es el jugador encargado de proteger la portería y evitar los goles.',
    explanationHy: 'Դարպասապահը այն խաղացողն է, որի գլխավոր պարտականությունն է պաշտպանել դարպասը և կանխել գոլերը։',
  },
  {
    id: 2,
    questionEs: '¿Qué parte del cuerpo utilizas cuando rematas de cabeza?',
    questionHy: 'Մարմնի ո՞ր մասն ես օգտագործում, երբ գլխով հարվածում ես գնդակին։',
    options: [
      { id: 'A', es: 'El pie', hy: 'Ոտքը' },
      { id: 'B', es: 'La mano', hy: 'Ձեռքը' },
      { id: 'C', es: 'La cabeza', hy: 'Գլուխը' },
      { id: 'D', es: 'La rodilla', hy: 'Ծունկը' },
    ],
    correctAnswer: 'C',
    explanationEs: '«Rematar de cabeza» significa golpear el balón con la cabeza hacia la portería.',
    explanationHy: '«Rematar de cabeza» նշանակում է գնդակին հարվածել գլխով՝ ուղղելով դեպի դարպասը։',
  },
  {
    id: 3,
    questionEs: '¿Quién dirige los entrenamientos del equipo?',
    questionHy: 'Ո՞վ է ղեկավարում թիմի մարզումները։',
    options: [
      { id: 'A', es: 'El entrenador', hy: 'Մարզիչը' },
      { id: 'B', es: 'El árbitro', hy: 'Մրցավարը' },
      { id: 'C', es: 'El aficionado', hy: 'Երկրպագուն' },
      { id: 'D', es: 'El periodista', hy: 'Լրագրողը' },
    ],
    correctAnswer: 'A',
    explanationEs: 'El entrenador (director técnico) planifica las tácticas y dirige los entrenamientos.',
    explanationHy: 'Մարզիչը ղեկավարում է մարզումները, ընտրում է մարտավարությունը և պատրաստում թիմին խաղերին։',
  },
  {
    id: 4,
    questionEs: '¿Qué significa «marcar un gol»?',
    questionHy: 'Ի՞նչ է նշանակում «marcar un gol»։',
    options: [
      { id: 'A', es: 'Dar un pase', hy: 'Փոխանցում կատարել' },
      { id: 'B', es: 'Perder el balón', hy: 'Գնդակը կորցնել' },
      { id: 'C', es: 'Sustituir a un jugador', hy: 'Խաղացողին փոխարինել' },
      { id: 'D', es: 'Anotar un tanto / Gol', hy: 'Գոլ խփել' },
    ],
    correctAnswer: 'D',
    explanationEs: '«Marcar un gol» significa introducir el balón dentro de la portería rival.',
    explanationHy: '«Marcar un gol» նշանակում է գոլ խփել (գնդակն ուղարկել մրցակցի դարպասը)։',
  },
  {
    id: 5,
    questionEs: '¿Dónde se juega un partido de fútbol?',
    questionHy: 'Որտե՞ղ է անցկացվում ֆուտբոլային հանդիպումը։',
    options: [
      { id: 'A', es: 'En una piscina', hy: 'Լողավազանում' },
      { id: 'B', es: 'En un campo de fútbol', hy: 'Ֆուտբոլի դաշտում' },
      { id: 'C', es: 'En una pista de hielo', hy: 'Սահադաշտում' },
      { id: 'D', es: 'En una cancha de tenis', hy: 'Թենիսի խաղահրապարակում' },
    ],
    correctAnswer: 'B',
    explanationEs: 'El fútbol se juega sobre césped en un campo de fútbol.',
    explanationHy: 'Ֆուտբոլը խաղում են հատուկ խոտածածկ ֆուտբոլային դաշտում։',
  },
  {
    id: 6,
    questionEs: '¿Qué jugador actúa principalmente en el centro del campo?',
    questionHy: 'Ո՞ր խաղացողն է հիմնականում խաղում դաշտի կենտրոնական հատվածում։',
    options: [
      { id: 'A', es: 'El portero', hy: 'Դարպասապահը' },
      { id: 'B', es: 'El delantero', hy: 'Հարձակվողը' },
      { id: 'C', es: 'El centrocampista', hy: 'Կիսապաշտպանը' },
      { id: 'D', es: 'El defensa central', hy: 'Կենտրոնական պաշտպանը' },
    ],
    correctAnswer: 'C',
    explanationEs: 'El centrocampista (o mediocampista) organiza el juego en la zona media.',
    explanationHy: 'Կիսապաշտպանը կապում է պաշտպանությունն ու հարձակումը դաշտի կենտրոնում։',
  },
  {
    id: 7,
    questionEs: 'Tu compañero dice: «¡Pásame el balón!». ¿Qué te pide?',
    questionHy: 'Թիմակիցդ ասում է․ «¡Pásame el balón!»։ Ի՞նչ է նա խնդրում։',
    options: [
      { id: 'A', es: 'Que le des un pase', hy: 'Որ իրեն փոխանցես գնդակը' },
      { id: 'B', es: 'Que salgas del campo', hy: 'Որ դուրս գաս դաշտից' },
      { id: 'C', es: 'Que te sientes', hy: 'Որ նստես' },
      { id: 'D', es: 'Que cambies de botas', hy: 'Որ խաղակոշիկներդ փոխես' },
    ],
    correctAnswer: 'A',
    explanationEs: '«Pasar el balón» es la acción de enviar el esférico a un compañero de equipo.',
    explanationHy: '«Pásame el balón» նշանակում է «Փոխանցի՛ր ինձ գնդակը»։',
  },
  {
    id: 8,
    questionEs: '¿Qué significa «empatar»?',
    questionHy: 'Ի՞նչ է նշանակում «empatar»։',
    options: [
      { id: 'A', es: 'Ganar el partido', hy: 'Հաղթել' },
      { id: 'B', es: 'Perder el partido', hy: 'Պարտվել' },
      { id: 'C', es: 'Entrenar duro', hy: 'Մարզվել' },
      { id: 'D', es: 'Igualar el marcador', hy: 'Ոչ-ոքի խաղալ' },
    ],
    correctAnswer: 'D',
    explanationEs: '«Empatar» es cuando ambos equipos finalizan el encuentro con el mismo número de goles.',
    explanationHy: '«Empatar» նշանակում է գրանցել հավասար հաշիվ՝ խաղալ ոչ-ոքի։',
  },
  {
    id: 9,
    questionEs: '¿Quién hace cumplir las reglas durante el partido?',
    questionHy: 'Ո՞վ է հետևում կանոնների պահպանմանը խաղի ընթացքում։',
    options: [
      { id: 'A', es: 'El capitán', hy: 'Ավագը' },
      { id: 'B', es: 'El árbitro', hy: 'Մրցավարը' },
      { id: 'C', es: 'El aficionado', hy: 'Երկրպագուն' },
      { id: 'D', es: 'El comentarista', hy: 'Մեկնաբանը' },
    ],
    correctAnswer: 'B',
    explanationEs: 'El árbitro es la máxima autoridad arbitral que aplica el reglamento en el campo.',
    explanationHy: 'Մրցավարը (կամ դատավորը) ապահովում է ֆուտբոլային կանոնների ճշգրիտ կատարումը։',
  },
  {
    id: 10,
    questionEs: '¿Qué se ponen los jugadores para protegerse las espinillas?',
    questionHy: 'Ի՞նչ են կրում ֆուտբոլիստները՝ սրունքները պաշտպանելու համար։',
    options: [
      { id: 'A', es: 'Guantes', hy: 'Ձեռնոցներ' },
      { id: 'B', es: 'Gorras', hy: 'Գլխարկներ' },
      { id: 'C', es: 'Espinilleras', hy: 'Սրունքապաշտպաններ' },
      { id: 'D', es: 'Bufandas', hy: 'Շարֆեր' },
    ],
    correctAnswer: 'C',
    explanationEs: 'Las espinilleras protegen la tibia contra golpes e impactos fuertes durante el juego.',
    explanationHy: 'Սրունքապաշտպանները (espinilleras) կրում են գուլպաների տակ՝ ոտքերի վնասվածքները կանխելու համար։',
  },
  {
    id: 11,
    questionEs: 'El entrenador dice: «¡Tira a puerta!». ¿Qué debes hacer?',
    questionHy: 'Մարզիչն ասում է․ «¡Tira a puerta!»։ Ի՞նչ պետք է անես։',
    options: [
      { id: 'A', es: 'Intentar marcar un gol', hy: 'Փորձել գոլ խփել' },
      { id: 'B', es: 'Ir al banquillo', hy: 'Գնալ պահեստայինների նստարան' },
      { id: 'C', es: 'Entregar el balón al árbitro', hy: 'Գնդակը տալ մրցավարին' },
      { id: 'D', es: 'Salir del estadio', hy: 'Դուրս գալ մարզադաշտից' },
    ],
    correctAnswer: 'A',
    explanationEs: '«Tirar a puerta» significa chutar el balón con fuerza hacia la portería rival para marcar gol.',
    explanationHy: '«Tira a puerta!» նշանակում է հարվածել դեպի դարպասը՝ փորձելով գոլ խփել։',
  },
  {
    id: 12,
    questionEs: '¿Qué significa «el vestuario»?',
    questionHy: 'Ի՞նչ է նշանակում «el vestuario»։',
    options: [
      { id: 'A', es: 'El estadio', hy: 'Մարզադաշտ' },
      { id: 'B', es: 'La portería', hy: 'Դարպաս' },
      { id: 'C', es: 'La grada / tribuna', hy: 'Տրիբունա' },
      { id: 'D', es: 'El vestidor del equipo', hy: 'Հանդերձարան' },
    ],
    correctAnswer: 'D',
    explanationEs: 'El vestuario es la sala donde los jugadores se cambian de ropa y reciben instrucciones.',
    explanationHy: '«El vestuario»-ն այն սենյակն է, որտեղ ֆուտբոլիստները հագնվում են և հանգստանում (հանդերձարան)։',
  },
  {
    id: 13,
    questionEs: 'Tu equipo marca tres goles y el rival marca uno. ¿Cuál es el resultado?',
    questionHy: 'Քո թիմը խփում է երեք գոլ, իսկ մրցակիցը՝ մեկ։ Ո՞րն է հաշիվը՝ քո թիմի գոլերը նշելով առաջինը։',
    options: [
      { id: 'A', es: 'Uno a tres', hy: 'Մեկ։երեք (1:3)' },
      { id: 'B', es: 'Tres a uno', hy: 'Երեք։մեկ (3:1)' },
      { id: 'C', es: 'Tres a tres', hy: 'Երեք։երեք (3:3)' },
      { id: 'D', es: 'Uno a cero', hy: 'Մեկ։զրո (1:0)' },
    ],
    correctAnswer: 'B',
    explanationEs: 'Tres goles a favor y uno en contra se expresa como «tres a uno» (3:1).',
    explanationHy: 'Երեք գոլ քո թիմը և մեկ գոլ մրցակիցը արտասանվում է «Tres a uno» (3:1)։',
  },
  {
    id: 14,
    questionEs: '¿Qué hace un jugador cuando regatea a un rival?',
    questionHy: 'Ի՞նչ է անում խաղացողը, երբ «regatea a un rival»։',
    options: [
      { id: 'A', es: 'Habla con el árbitro', hy: 'Խոսում է մրցավարի հետ' },
      { id: 'B', es: 'Se sienta en el banquillo', hy: 'Նստում է պահեստայինների նստարանին' },
      { id: 'C', es: 'Supera al rival controlando el balón', hy: 'Գնդակը վերահսկելով՝ շրջանցում է մրցակցին' },
      { id: 'D', es: 'Se cambia de camiseta', hy: 'Փոխում է մարզաշապիկը' },
    ],
    correctAnswer: 'C',
    explanationEs: 'Regatear (dribbling) es superar a un adversario mediante habilidad técnica con el balón.',
    explanationHy: 'Դրիբլինգը կամ շրջանցումը («regatear») գնդակի վերահսկողությամբ մրցակցին անցնելն է։',
  },
  {
    id: 15,
    questionEs: '¿Cómo se llama la persona que apoya a un equipo?',
    questionHy: 'Ինչպե՞ս է կոչվում այն մարդը, որն աջակցում է որևէ թիմի։',
    options: [
      { id: 'A', es: 'Aficionado / Hincha', hy: 'Երկրպագու' },
      { id: 'B', es: 'Árbitro', hy: 'Մրցավար' },
      { id: 'C', es: 'Rival', hy: 'Մրցակից' },
      { id: 'D', es: 'Entrenador', hy: 'Մարզիչ' },
    ],
    correctAnswer: 'A',
    explanationEs: 'El aficionado o hincha alienta y apoya apasionadamente a su club o selección.',
    explanationHy: '«El aficionado»-ն (կամ hinchas) թիմի հավատարիմ երկրպագուն է։',
  },
  {
    id: 16,
    questionEs: 'El entrenador dice: «¡Calienta antes de entrar!». ¿Qué te pide?',
    questionHy: 'Մարզիչն ասում է․ «¡Calienta antes de entrar!»։ Ի՞նչ է նա խնդրում։',
    options: [
      { id: 'A', es: 'Que comas antes de jugar', hy: 'Որ ուտես խաղալուց առաջ' },
      { id: 'B', es: 'Que limpies tus botas', hy: 'Որ մաքրես խաղակոշիկներդ' },
      { id: 'C', es: 'Que cierres la puerta', hy: 'Որ փակես դուռը' },
      { id: 'D', es: 'Que prepares el cuerpo con ejercicios', hy: 'Որ վարժություններով մարմինդ պատրաստես խաղին' },
    ],
    correctAnswer: 'D',
    explanationEs: '«Calentar» es realizar ejercicios previos para preparar los músculos y evitar lesiones.',
    explanationHy: '«Calentar» նշանակում է նախավարժանք կատարել՝ մկանները խաղին նախապատրաստելու համար։',
  },
  {
    id: 17,
    questionEs: '¿Qué significa «el banquillo» en el fútbol?',
    questionHy: 'Ֆուտբոլում ի՞նչ է նշանակում «el banquillo»։',
    options: [
      { id: 'A', es: 'El centro del campo', hy: 'Դաշտի կենտրոնը' },
      { id: 'B', es: 'El asiento de los suplentes', hy: 'Պահեստայինների նստարանը' },
      { id: 'C', es: 'La portería rival', hy: 'Մրցակցի դարպասը' },
      { id: 'D', es: 'La entrada del estadio', hy: 'Մարզադաշտի մուտքը' },
    ],
    correctAnswer: 'B',
    explanationEs: 'El banquillo es donde se sientan los jugadores suplentes y el cuerpo técnico.',
    explanationHy: '«El banquillo»-ն պահեստային խաղացողների և մարզչական շտաբի նստարանն է։',
  },
  {
    id: 18,
    questionEs: 'Un compañero te dice: «¡Estoy solo!». Durante una jugada, ¿qué suele querer decir?',
    questionHy: 'Խաղային դրվագի ժամանակ թիմակիցդ ասում է․ «¡Estoy solo!»։ Սովորաբար ի՞նչ նկատի ունի։',
    options: [
      { id: 'A', es: 'No quiere seguir jugando', hy: 'Չի ուզում շարունակել խաղը' },
      { id: 'B', es: 'No tiene equipo', hy: 'Թիմ չունի' },
      { id: 'C', es: 'Está libre de marca y puede recibir un pase', hy: 'Ազատ է հսկողությունից և կարող է փոխանցում ստանալ' },
      { id: 'D', es: 'Está solo en el estadio', hy: 'Մարզադաշտում մենակ է' },
    ],
    correctAnswer: 'C',
    explanationEs: '«Estoy solo» indica que ningún defensor rival lo está presionando, por lo que pide el pase.',
    explanationHy: '«¡Estoy solo!» նշանակում է «Ես ազատ եմ, փոխանցի՛ր գնդակը»։',
  },
  {
    id: 19,
    questionEs: '¿Qué significa «recuperar el balón»?',
    questionHy: 'Ի՞նչ է նշանակում «recuperar el balón»։',
    options: [
      { id: 'A', es: 'Volver a tener la posesión del balón', hy: 'Վերադարձնել գնդակի վերահսկողությունը' },
      { id: 'B', es: 'Echar el balón fuera del campo', hy: 'Գնդակը դուրս ուղարկել դաշտից' },
      { id: 'C', es: 'Regalar el balón a un aficionado', hy: 'Գնդակը նվիրել երկրպագուին' },
      { id: 'D', es: 'Cambiar el balón por uno nuevo', hy: 'Գնդակը փոխարինել նորով' },
    ],
    correctAnswer: 'A',
    explanationEs: '«Recuperar el balón» es arrebatar la posesión al rival mediante intercepción o quite limpio.',
    explanationHy: '«Recuperar el balón» նշանակում է խլել կամ վերադարձնել գնդակի տիրապետումը։',
  },
  {
    id: 20,
    questionEs: 'Tu equipo ha ganado. ¿Qué frase expresa alegría por la victoria?',
    questionHy: 'Քո թիմը հաղթել է։ Ո՞ր արտահայտությունն է ուրախություն արտահայտում հաղթանակի համար։',
    options: [
      { id: 'A', es: '¡Qué pena haber perdido!', hy: 'Ի՜նչ ափսոս, որ պարտվեցինք։' },
      { id: 'B', es: 'Tenemos que empatar.', hy: 'Պետք է հավասարեցնենք հաշիվը։' },
      { id: 'C', es: 'El partido todavía no ha empezado.', hy: 'Խաղը դեռ չի սկսվել։' },
      { id: 'D', es: '¡Lo hemos conseguido!', hy: 'Մեզ հաջողվե՜ց։' },
    ],
    correctAnswer: 'D',
    explanationEs: '«¡Lo hemos conseguido!» expresa el júbilo y la celebración por haber logrado la victoria.',
    explanationHy: '«¡Lo hemos conseguido!» արտահայտությունը նշանակում է «Մեզ հաջողվե՜ց» կամ «Մենք հասանք մեր նպատակին»։',
  },
];
