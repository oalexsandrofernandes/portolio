const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;

/* ------------------------------------------------------------
   Banco de imagens do site — estudo de arquitetura moderna
   brasileira. São OBRAS DE TERCEIROS, usadas aqui como
   referência de estudo: cada foto guarda o arquiteto autor da
   obra, o fotógrafo, a licença e o link para a fonte, exibidos
   na página de cada obra.

   Todas as fotos vêm do Wikimedia Commons sob licença livre
   (CC BY, CC BY-SA ou domínio público). O direito de fotografar
   obras em logradouro público no Brasil vem da liberdade de
   panorama (art. 48 da Lei 9.610/98).

   Ao substituir por projetos próprios, troque estes campos por
   autoria própria e remova os créditos de terceiros.
------------------------------------------------------------- */
const PROJECTS = [
  { work: "Museu Brasileiro da Escultura", architect: "Paulo Mendes da Rocha", year: "1988", city: "São Paulo", img: "img/obras/museu-brasileiro-da-escultura-1.jpg", alt: "Museu Brasileiro da Escultura, de Paulo Mendes da Rocha (1988)", credit: "seier+seier", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File%3APaulo%20mendes%20da%20rocha%2C%20sao%20paulo%20april%202006%20(493990086).jpg" },
  { work: "Museu Brasileiro da Escultura", architect: "Paulo Mendes da Rocha", year: "1988", city: "São Paulo", img: "img/obras/museu-brasileiro-da-escultura-2.jpg", alt: "Museu Brasileiro da Escultura, de Paulo Mendes da Rocha (1988)", credit: "Ghiraldini", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File%3A%C3%81rea%20externa%20com%20bruma.jpg" },
  { work: "Museu Brasileiro da Escultura", architect: "Paulo Mendes da Rocha", year: "1988", city: "São Paulo", img: "img/obras/museu-brasileiro-da-escultura-3.jpg", alt: "Museu Brasileiro da Escultura, de Paulo Mendes da Rocha (1988)", credit: "Ghiraldini", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File%3A%C3%81rea%20externa%2C%20MuBE.jpg" },
  { work: "Pinacoteca do Estado", architect: "Paulo Mendes da Rocha", year: "1998", city: "São Paulo", img: "img/obras/pinacoteca-do-estado-2.jpg", alt: "Pinacoteca do Estado, de Paulo Mendes da Rocha (1998)", credit: "Paulo SP/ Wikimedia", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File%3APinacoteca%20do%20Estado%20de%20S%C3%A3o%20Paulo%2C%20Luz%2C%20S%C3%A3o%20Paulo%20-%202023-10-30%20-%20DSC09050.jpg" },
  { work: "Pinacoteca do Estado", architect: "Paulo Mendes da Rocha", year: "1998", city: "São Paulo", img: "img/obras/pinacoteca-do-estado-5.jpg", alt: "Pinacoteca do Estado, de Paulo Mendes da Rocha (1998)", credit: "Janaina de cassia", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File%3APinacoteca.angulo2.jpg" },
  { work: "Estádio Serra Dourada", architect: "Paulo Mendes da Rocha", year: "1975", city: "Goiânia", img: "img/obras/estadio-serra-dourada-2.jpg", alt: "Estádio Serra Dourada, de Paulo Mendes da Rocha (1975)", credit: "JorgeBrazil", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File%3AEst%C3%A1dio%20Serra%20Dourada1.jpg" },
  { work: "Estádio Serra Dourada", architect: "Paulo Mendes da Rocha", year: "1975", city: "Goiânia", img: "img/obras/estadio-serra-dourada-3.jpg", alt: "Estádio Serra Dourada, de Paulo Mendes da Rocha (1975)", credit: "JorgeBrazil", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File%3AEst%C3%A1dio%20Serra%20Dourada2.jpg" },
  { work: "Estádio Serra Dourada", architect: "Paulo Mendes da Rocha", year: "1975", city: "Goiânia", img: "img/obras/estadio-serra-dourada-4.jpg", alt: "Estádio Serra Dourada, de Paulo Mendes da Rocha (1975)", credit: "JorgeBrazil", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File%3AEst%C3%A1dio%20Serra%20Dourada3.jpg" },
  { work: "FAU-USP", architect: "Vilanova Artigas", year: "1969", city: "São Paulo", img: "img/obras/fau-usp-1.jpg", alt: "FAU-USP, de Vilanova Artigas (1969)", credit: "Núcleo Editorial", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File%3AFaculdade%20C%C3%A1sper%20L%C3%ADbero%20(17393200812).jpg" },
  { work: "FAU-USP", architect: "Vilanova Artigas", year: "1969", city: "São Paulo", img: "img/obras/fau-usp-2.jpg", alt: "FAU-USP, de Vilanova Artigas (1969)", credit: "Matheus Carvalho Teixeira", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File%3AVista%20interna%20da%20FAU-USP.jpg" },
  { work: "FAU-USP", architect: "Vilanova Artigas", year: "1969", city: "São Paulo", img: "img/obras/fau-usp-3.jpg", alt: "FAU-USP, de Vilanova Artigas (1969)", credit: "Photograph by Mike Peel (www.mikepeel.net).", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File%3AArchitecture%20and%20Urbanism%20College%20of%20University%20of%20S%C3%A3o%20Paulo%202016%2002.jpg" },
  { work: "FAU-USP", architect: "Vilanova Artigas", year: "1969", city: "São Paulo", img: "img/obras/fau-usp-5.jpg", alt: "FAU-USP, de Vilanova Artigas (1969)", credit: "Arte Fora do Museu", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File%3AFaculdade%20de%20Arquitetura%20e%20Urbanismo%20-%20USP%2001.jpg" },
  { work: "MASP", architect: "Lina Bo Bardi", year: "1968", city: "São Paulo", img: "img/obras/masp-4.jpg", alt: "MASP, de Lina Bo Bardi (1968)", credit: "Andredeak", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File%3AMasp%20de%20baixo.jpg" },
  { work: "SESC Pompéia", architect: "Lina Bo Bardi", year: "1986", city: "São Paulo", img: "img/obras/sesc-pompeia-1.jpg", alt: "SESC Pompéia, de Lina Bo Bardi (1986)", credit: "CORRETOR-CARVALHO", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File%3ASesc%20Pomp%C3%A9ia%20-%20panoramio.jpg" },
  { work: "SESC Pompéia", architect: "Lina Bo Bardi", year: "1986", city: "São Paulo", img: "img/obras/sesc-pompeia-2.jpg", alt: "SESC Pompéia, de Lina Bo Bardi (1986)", credit: "Molina", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File%3ABeattle%20Juice%20S%20Tower%20(109992543).jpeg" },
  { work: "SESC Pompéia", architect: "Lina Bo Bardi", year: "1986", city: "São Paulo", img: "img/obras/sesc-pompeia-3.jpg", alt: "SESC Pompéia, de Lina Bo Bardi (1986)", credit: "Joalpe", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File%3ASESC%20Pompeia%20-%20S%C3%A3o%20Paulo%20-%2020220726142122.jpg" },
  { work: "SESC Pompéia", architect: "Lina Bo Bardi", year: "1986", city: "São Paulo", img: "img/obras/sesc-pompeia-4.jpg", alt: "SESC Pompéia, de Lina Bo Bardi (1986)", credit: "JanManu", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File%3APom-Sporthalle%20Innen.jpg" },
  { work: "SESC Pompéia", architect: "Lina Bo Bardi", year: "1986", city: "São Paulo", img: "img/obras/sesc-pompeia-5.jpg", alt: "SESC Pompéia, de Lina Bo Bardi (1986)", credit: "JanManu", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File%3APompeia1%20aussen.jpg" },
  { work: "Edifício Copan", architect: "Oscar Niemeyer", year: "1966", city: "São Paulo", img: "img/obras/edificio-copan-2.jpg", alt: "Edifício Copan, de Oscar Niemeyer (1966)", credit: "Rodrigo Soldon from Rio de Janeiro, Brazil", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File%3AEdif%C3%ADcio%20Copan%20(3408031098).jpg" },
  { work: "Edifício Copan", architect: "Oscar Niemeyer", year: "1966", city: "São Paulo", img: "img/obras/edificio-copan-3.jpg", alt: "Edifício Copan, de Oscar Niemeyer (1966)", credit: "Casa de América", license: "CC BY-SA 2.0", source: "https://commons.wikimedia.org/wiki/File%3ACopan%201%202007%20(46606540425).jpg" },
  { work: "Edifício Copan", architect: "Oscar Niemeyer", year: "1966", city: "São Paulo", img: "img/obras/edificio-copan-4.jpg", alt: "Edifício Copan, de Oscar Niemeyer (1966)", credit: "José Eduardo Deboni", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File%3AEdif%C3%ADcio%20Copan%2C%20S%C3%A3o%20Paulo%2C%202008.jpg" },
  { work: "MAC Niterói", architect: "Oscar Niemeyer", year: "1996", city: "Niterói", img: "img/obras/mac-niteroi-2.jpg", alt: "MAC Niterói, de Oscar Niemeyer (1996)", credit: "Thaismay", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File%3AMuseu%20de%20Arte%20Contempor%C3%A2nea%20de%20Niter%C3%B3i%20-%20Niter%C3%B3i%20-%2020250309191233.JPG" },
  { work: "MAC Niterói", architect: "Oscar Niemeyer", year: "1996", city: "Niterói", img: "img/obras/mac-niteroi-3.jpg", alt: "MAC Niterói, de Oscar Niemeyer (1996)", credit: "Phx de", license: "CC BY-SA 2.5", source: "https://commons.wikimedia.org/wiki/File%3ANiter%C3%B3i%20bay%20and%20contemporary%20musem.jpg" },
  { work: "MAC Niterói", architect: "Oscar Niemeyer", year: "1996", city: "Niterói", img: "img/obras/mac-niteroi-4.jpg", alt: "MAC Niterói, de Oscar Niemeyer (1996)", credit: "Rosino", license: "CC BY-SA 2.0", source: "https://commons.wikimedia.org/wiki/File%3ANiter%C3%B3i%20Contemporary%20Art%20Museum%202011.jpg" },
  { work: "MAC Niterói", architect: "Oscar Niemeyer", year: "1996", city: "Niterói", img: "img/obras/mac-niteroi-5.jpg", alt: "MAC Niterói, de Oscar Niemeyer (1996)", credit: "NelsonPretto", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File%3AMAC%20Niteroi%2004.JPG" },
  { work: "Congresso Nacional", architect: "Oscar Niemeyer", year: "1960", city: "Brasília", img: "img/obras/congresso-nacional-3.jpg", alt: "Congresso Nacional, de Oscar Niemeyer (1960)", credit: "Sintegrity", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File%3ABras%C3%ADlia%20-%20Eixo%20monumental%20-%20rodovi%C3%A1ria%2C%20teatro%2C%20biblioteca%2C%20touring%2C%20museu%2C%20catedral%2C%20ponte%2C%20minist%C3%A9rios%2C%20congresso.jpg" },
  { work: "Palácio da Alvorada", architect: "Oscar Niemeyer", year: "1958", city: "Brasília", img: "img/obras/palacio-da-alvorada-1.jpg", alt: "Palácio da Alvorada, de Oscar Niemeyer (1958)", credit: "autoria não identificada", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File%3APal%C3%A1cio%20da%20Alvorada%20(1).jpg" },
  { work: "Palácio da Alvorada", architect: "Oscar Niemeyer", year: "1958", city: "Brasília", img: "img/obras/palacio-da-alvorada-2.jpg", alt: "Palácio da Alvorada, de Oscar Niemeyer (1958)", credit: "autoria não identificada", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File%3APal%C3%A1cio%20da%20Alvorada%20(2).jpg" },
  { work: "Palácio da Alvorada", architect: "Oscar Niemeyer", year: "1958", city: "Brasília", img: "img/obras/palacio-da-alvorada-4.jpg", alt: "Palácio da Alvorada, de Oscar Niemeyer (1958)", credit: "autoria não identificada", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File%3APal%C3%A1cio%20da%20Alvorada%20-%20Capela%20(1).jpg" },
  { work: "Palácio da Alvorada", architect: "Oscar Niemeyer", year: "1958", city: "Brasília", img: "img/obras/palacio-da-alvorada-5.jpg", alt: "Palácio da Alvorada, de Oscar Niemeyer (1958)", credit: "autoria não identificada", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File%3AObras%20de%20constru%C3%A7%C3%A3o%20de%20Bras%C3%ADlia%20-%20Pal%C3%A1cio%20da%20Alvorada%20(5).jpg" },
  { work: "Auditório Ibirapuera", architect: "Oscar Niemeyer", year: "2005", city: "São Paulo", img: "img/obras/auditorio-ibirapuera-1.jpg", alt: "Auditório Ibirapuera, de Oscar Niemeyer (2005)", credit: "Pēteris", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File%3AFile%20by%20Peteris%20P1170370%20(3667704986).jpg" },
  { work: "Auditório Ibirapuera", architect: "Oscar Niemeyer", year: "2005", city: "São Paulo", img: "img/obras/auditorio-ibirapuera-2.jpg", alt: "Auditório Ibirapuera, de Oscar Niemeyer (2005)", credit: "Sérgio Valle Duarte .mw-parser-output .messagebox{margin:4px 0;width:a", license: "CC BY 3.0", source: "https://commons.wikimedia.org/wiki/File%3AAudit%C3%B3rio%20Ibirapuera%20-%202006.jpg" },
  { work: "Auditório Ibirapuera", architect: "Oscar Niemeyer", year: "2005", city: "São Paulo", img: "img/obras/auditorio-ibirapuera-5.jpg", alt: "Auditório Ibirapuera, de Oscar Niemeyer (2005)", credit: "ermell", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File%3ABrazil-Ibirapuera-Auditorium-1030458PS.jpg" },
  { work: "Museu Nacional da República", architect: "Oscar Niemeyer", year: "2006", city: "Brasília", img: "img/obras/museu-nacional-da-republica-2.jpg", alt: "Museu Nacional da República, de Oscar Niemeyer (2006)", credit: "MinC.Nordeste", license: "CC BY-SA 2.0", source: "https://commons.wikimedia.org/wiki/File%3AMuseu%20Nacional%20Honestino%20Guimar%C3%A3es%209.jpg" },
  { work: "Museu Nacional da República", architect: "Oscar Niemeyer", year: "2006", city: "Brasília", img: "img/obras/museu-nacional-da-republica-3.jpg", alt: "Museu Nacional da República, de Oscar Niemeyer (2006)", credit: "Cayambe", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File%3ABras%C3%ADlia%20Museu%20Nacional%20Honestino%20Guimar%C3%A3es.jpg" },
  { work: "Museu Nacional da República", architect: "Oscar Niemeyer", year: "2006", city: "Brasília", img: "img/obras/museu-nacional-da-republica-4.jpg", alt: "Museu Nacional da República, de Oscar Niemeyer (2006)", credit: "Cayambe", license: "CC BY-SA 3.0 lu", source: "https://commons.wikimedia.org/wiki/File%3ABrasilia%20National%20Museum%20National%20Library.jpg" },
  { work: "Museu Nacional da República", architect: "Oscar Niemeyer", year: "2006", city: "Brasília", img: "img/obras/museu-nacional-da-republica-5.jpg", alt: "Museu Nacional da República, de Oscar Niemeyer (2006)", credit: "Roberto de vasconcel…", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File%3ABRASILIA%20DF%20-%20panoramio%20(5).jpg" },
  { work: "MAM Rio", architect: "Affonso Eduardo Reidy", year: "1955", city: "Rio de Janeiro", img: "img/obras/mam-rio-1.jpg", alt: "MAM Rio, de Affonso Eduardo Reidy (1955)", credit: "Andrevruas", license: "CC BY 3.0", source: "https://commons.wikimedia.org/wiki/File%3AEntrada%20do%20Museu%20de%20Arte%20Moderna%20do%20Rio%20de%20Janeiro%20(2011-01-15).jpg" },
  { work: "MAM Rio", architect: "Affonso Eduardo Reidy", year: "1955", city: "Rio de Janeiro", img: "img/obras/mam-rio-2.jpg", alt: "MAM Rio, de Affonso Eduardo Reidy (1955)", credit: "Andrevruas", license: "CC BY 3.0", source: "https://commons.wikimedia.org/wiki/File%3ARiomam.jpg" },
  { work: "MAM Rio", architect: "Affonso Eduardo Reidy", year: "1955", city: "Rio de Janeiro", img: "img/obras/mam-rio-3.jpg", alt: "MAM Rio, de Affonso Eduardo Reidy (1955)", credit: "Dornicke", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File%3AEspa%C3%A7o%20de%20eventos%20do%20MAM%2002.jpg" },
  { work: "MAM Rio", architect: "Affonso Eduardo Reidy", year: "1955", city: "Rio de Janeiro", img: "img/obras/mam-rio-4.jpg", alt: "MAM Rio, de Affonso Eduardo Reidy (1955)", credit: "Dornicke", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File%3AMAM%20e%20teatro%20-%20Rio%2001.jpg" },
  { work: "MAM Rio", architect: "Affonso Eduardo Reidy", year: "1955", city: "Rio de Janeiro", img: "img/obras/mam-rio-5.jpg", alt: "MAM Rio, de Affonso Eduardo Reidy (1955)", credit: "Dornicke", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File%3ATeatro%20do%20Museu%20de%20Arte%20Moderna%20do%20Rio%20de%20Janeiro%2002.jpg" },
  { work: "Teatro Nacional Cláudio Santoro", architect: "Oscar Niemeyer", year: "1966", city: "Brasília", img: "img/obras/teatro-nacional-claudio-santoro-2.jpg", alt: "Teatro Nacional Cláudio Santoro, de Oscar Niemeyer (1966)", credit: "Luis Dantas", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File%3ATeatro%20Nacional%20Claudio%20Santoro%2002.jpg" },
  { work: "Teatro Nacional Cláudio Santoro", architect: "Oscar Niemeyer", year: "1966", city: "Brasília", img: "img/obras/teatro-nacional-claudio-santoro-3.jpg", alt: "Teatro Nacional Cláudio Santoro, de Oscar Niemeyer (1966)", credit: "Py4nf", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File%3ATeatro%20nacional%20brasilia.jpg" },
  { work: "Teatro Nacional Cláudio Santoro", architect: "Oscar Niemeyer", year: "1966", city: "Brasília", img: "img/obras/teatro-nacional-claudio-santoro-4.jpg", alt: "Teatro Nacional Cláudio Santoro, de Oscar Niemeyer (1966)", credit: "A C Moraes from Brasília, Brasil", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File%3ABras%C3%ADlia%20(8629553828).jpg" },
  { work: "Teatro Nacional Cláudio Santoro", architect: "Oscar Niemeyer", year: "1966", city: "Brasília", img: "img/obras/teatro-nacional-claudio-santoro-5.jpg", alt: "Teatro Nacional Cláudio Santoro, de Oscar Niemeyer (1966)", credit: "Thiago Melo from Brasília, Brasil", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File%3ATeatro%20Nacional%20(4893154074).jpg" },
  { work: "Palácio do Planalto", architect: "Oscar Niemeyer", year: "1960", city: "Brasília", img: "img/obras/palacio-do-planalto-1.jpg", alt: "Palácio do Planalto, de Oscar Niemeyer (1960)", credit: "Senado Federal", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File%3AFotos%20produzidas%20pelo%20Senado%20(35097602953).jpg" },
  { work: "Palácio do Planalto", architect: "Oscar Niemeyer", year: "1960", city: "Brasília", img: "img/obras/palacio-do-planalto-5.jpg", alt: "Palácio do Planalto, de Oscar Niemeyer (1960)", credit: "Mariordo (Mario Roberto Durán Ortiz)", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File%3AOs%20Guerreiros%20(Os%20Candangos)%20BSB%2008%202005%2033.jpg" },
  { work: "Memorial da América Latina", architect: "Oscar Niemeyer", year: "1989", city: "São Paulo", img: "img/obras/memorial-da-america-latina-1.jpg", alt: "Memorial da América Latina, de Oscar Niemeyer (1989)", credit: "Núcleo Editorial", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File%3AMemorial%20da%20Am%C3%A9rica%20Latina%20(16734674763).jpg" },
  { work: "Memorial da América Latina", architect: "Oscar Niemeyer", year: "1989", city: "São Paulo", img: "img/obras/memorial-da-america-latina-3.jpg", alt: "Memorial da América Latina, de Oscar Niemeyer (1989)", credit: "Governo do Estado de São Paulo", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File%3AMemorial%20da%20Am%C3%A9rica%20Latina.%20(40658808253).jpg" },
  { work: "Memorial da América Latina", architect: "Oscar Niemeyer", year: "1989", city: "São Paulo", img: "img/obras/memorial-da-america-latina-4.jpg", alt: "Memorial da América Latina, de Oscar Niemeyer (1989)", credit: "autoria não identificada", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File%3ACentroderecep%C3%A7%C3%A3o-Memorial.jpg" },
  { work: "Memorial da América Latina", architect: "Oscar Niemeyer", year: "1989", city: "São Paulo", img: "img/obras/memorial-da-america-latina-5.jpg", alt: "Memorial da América Latina, de Oscar Niemeyer (1989)", credit: "Dornicke", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File%3AAudit%C3%B3rio%20Sim%C3%B3n%20Bol%C3%ADvar%2002.jpg" },
  { work: "Palácio da Justiça", architect: "Oscar Niemeyer", year: "1970", city: "Brasília", img: "img/obras/palacio-da-justica-1.jpg", alt: "Palácio da Justiça, de Oscar Niemeyer (1970)", credit: "Senado Federal", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File%3ASenado%20Federal%20do%20Brasil%20Fotos%20produzidas%20pelo%20Senado%20(15698834561).jpg" },
  { work: "Palácio da Justiça", architect: "Oscar Niemeyer", year: "1970", city: "Brasília", img: "img/obras/palacio-da-justica-2.jpg", alt: "Palácio da Justiça, de Oscar Niemeyer (1970)", credit: "Arquivo/Agência Brasil", license: "CC BY 3.0 br", source: "https://commons.wikimedia.org/wiki/File%3AArquivo%20da%20Ag%C3%AAncia%20Brasil%20-%20Bras%C3%ADlia%2012.jpg" },
  { work: "Palácio da Justiça", architect: "Oscar Niemeyer", year: "1970", city: "Brasília", img: "img/obras/palacio-da-justica-3.jpg", alt: "Palácio da Justiça, de Oscar Niemeyer (1970)", credit: "Senado Federal", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File%3AFotos%20produzidas%20pelo%20Senado%20(31106158601).jpg" },
  { work: "Palácio da Justiça", architect: "Oscar Niemeyer", year: "1970", city: "Brasília", img: "img/obras/palacio-da-justica-4.jpg", alt: "Palácio da Justiça, de Oscar Niemeyer (1970)", credit: "Senado Federal, Foto: Roque de Sá/Agência Senado", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File%3AFotos%20produzidas%20pelo%20Senado%20(31039158601).jpg" },
  { work: "Panteão da Pátria", architect: "Oscar Niemeyer", year: "1986", city: "Brasília", img: "img/obras/panteao-da-patria-1.jpg", alt: "Panteão da Pátria, de Oscar Niemeyer (1986)", credit: "Senado Federal", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File%3APante%C3%A3o%20da%20P%C3%A1tria%20Tancredo%20Neves%20-%2043752599380.jpg" },
  { work: "Panteão da Pátria", architect: "Oscar Niemeyer", year: "1986", city: "Brasília", img: "img/obras/panteao-da-patria-3.jpg", alt: "Panteão da Pátria, de Oscar Niemeyer (1986)", credit: "Alex Pereira", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File%3APanteaodadem.jpg" },
  { work: "Panteão da Pátria", architect: "Oscar Niemeyer", year: "1986", city: "Brasília", img: "img/obras/panteao-da-patria-4.jpg", alt: "Panteão da Pátria, de Oscar Niemeyer (1986)", credit: "Rezieredegobi", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File%3APraca%20dos%20Tr%C3%AAs%20Poderes.tiff" },
  { work: "Panteão da Pátria", architect: "Oscar Niemeyer", year: "1986", city: "Brasília", img: "img/obras/panteao-da-patria-5.jpg", alt: "Panteão da Pátria, de Oscar Niemeyer (1986)", credit: "Joehawkins", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File%3APra%C3%A7a%20dos%20Tr%C3%AAs%20Poderes%20com%20bandeira%20e%20Pombal.JPG" },
];

function slugify(str) {
  const stripAccents = new RegExp('[̀-ͯ]', 'g');
  return str.normalize('NFD').replace(stripAccents, '')
    .toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

/* agrupa as fotos por projeto — usado no índice de trabalhos (categorias)
   e na página de foco (projeto.html?p=<slug>) */
const PROJECT_GROUPS = PROJECTS.reduce((groups, item) => {
  let group = groups.find(g => g.name === item.work);
  if (!group) {
    group = {
      name: item.work, slug: slugify(item.work),
      architect: item.architect, year: item.year, city: item.city,
      type: item.architect + ' · ' + item.year,
      photos: [],
    };
    groups.push(group);
  }
  group.photos.push(item);
  return groups;
}, []);

function buildGalleryItem(item, key, { caption = true } = {}) {
  const a = document.createElement('a');
  a.className = 'g-item reveal';
  a.href = '#';
  a.dataset.project = item.work;

  const img = document.createElement('img');
  img.src = item.img;
  img.alt = item.alt;
  img.loading = 'lazy';
  a.append(img);

  if (caption) {
    const figcaption = document.createElement('figcaption');
    figcaption.innerHTML = `<span class="title">${item.work}</span><span class="type mono">${item.architect}</span>`;
    a.append(figcaption);
  }

  if (key !== undefined) a.dataset.key = key;
  return a;
}

/* observador único de revelação no scroll — reaproveitado para itens
   adicionados dinamicamente na galeria da home */
const revealObserver = !reduce ? new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); revealObserver.unobserve(en.target); }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }) : null;

function observeReveal(el, i = 0) {
  if (!revealObserver) { el.classList.add('in'); return; }
  el.style.transitionDelay = (i % 5) * 0.05 + 's';
  revealObserver.observe(el);
}

/* ---------------- trabalhos: grid e lista como inversão simétrica ----------------
   Os dois conjuntos são renderizados sempre, cada projeto aparecendo duas
   vezes (uma foto e um nome) ligados pelo mesmo data-rel. Passar o mouse em
   um deles marca o par correspondente — em modo grade a foto invoca o nome,
   em modo lista o nome invoca a foto. Só o CSS decide quem é conteúdo e quem
   é camada de revelação.
--------------------------------------------------------------------------- */
const workEl = document.getElementById('work');
const workGridEl = document.getElementById('work-grid');
const workListEl = document.getElementById('work-list');
if (workEl && workGridEl && workListEl) {
  PROJECT_GROUPS.forEach(group => {
    const cover = group.photos[0];
    const href = `projeto.html?p=${group.slug}`;

    const gridItem = document.createElement('a');
    gridItem.className = 'work-grid-item';
    gridItem.href = href;
    gridItem.dataset.rel = group.slug;
    const img = document.createElement('img');
    img.src = cover.img;
    img.alt = cover.alt;
    // sem lazy: as fotos precisam estar prontas pra aparecer no hover da lista
    gridItem.appendChild(img);
    workGridEl.appendChild(gridItem);

    const listItem = document.createElement('a');
    listItem.className = 'work-list-item';
    listItem.href = href;
    listItem.dataset.rel = group.slug;
    listItem.innerHTML = `<span class="work-name">${group.name}</span>`;
    workListEl.appendChild(listItem);
  });

  const pairs = new Map();
  [...workGridEl.children, ...workListEl.children].forEach(el => {
    const rel = el.dataset.rel;
    if (!pairs.has(rel)) pairs.set(rel, []);
    pairs.get(rel).push(el);
  });

  function setHover(rel, on) {
    pairs.get(rel).forEach(el => {
      el.classList.toggle('is-hovering', on);
      // "saindo" existe para o flip continuar o giro pro outro lado em vez
      // de voltar pelo mesmo caminho; some depois que a transição acaba
      el.classList.toggle('is-leaving', !on);
      if (!on) setTimeout(() => el.classList.remove('is-leaving'), 790);
    });
  }

  pairs.forEach((els, rel) => {
    els.forEach(el => {
      el.addEventListener('mouseenter', () => setHover(rel, true));
      el.addEventListener('mouseleave', () => setHover(rel, false));
      el.addEventListener('focus', () => setHover(rel, true));
      el.addEventListener('blur', () => setHover(rel, false));
    });
  });

  const workToggleButtons = [...document.querySelectorAll('.work-toggle button')];
  workToggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const list = btn.dataset.view === 'list';
      workEl.classList.toggle('view--list', list);
      workEl.classList.toggle('view--grid', !list);
      // troca de modo com o hover ainda ativo deixaria um par marcado
      pairs.forEach((_, rel) => setHover(rel, false));
      workToggleButtons.forEach(b => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
    });
  });
}

/* ---------------- home: grade "espalhada" com loop de scroll ---------------- */
const homeGalleryEl = document.getElementById('home-gallery');
if (homeGalleryEl) {
  // monta um "período" num fragment separado, fora da página ainda. Com
  // poucas fotos era preciso repetir a lista pro loop não parecer curto;
  // com o acervo atual uma passagem já dá altura de sobra — cada ciclo a
  // mais só duplicaria elementos no DOM sem ganho visual.
  const CYCLES = PROJECTS.length >= 40 ? 1 : 3;
  let index = 0;
  const periodFrag = document.createDocumentFragment();
  for (let c = 0; c < CYCLES; c++) {
    PROJECTS.forEach(item => {
      const el = buildGalleryItem(item, index, { caption: false }); // home: só foto, sem legenda
      el.classList.remove('reveal'); // a home usa reveal em cascata próprio, não o scroll-spy genérico
      periodFrag.appendChild(el);
      index++;

      // célula vazia periódica, só pra dar ritmo à grade — sem conteúdo
      if (index % 7 === 3) {
        const skip = document.createElement('div');
        skip.className = 'g-item g-item--skip';
        skip.setAttribute('aria-hidden', 'true');
        periodFrag.appendChild(skip);
      }
    });
  }

  // completa a última linha do período: o total de células (fotos + vazias)
  // precisa ser múltiplo de 5, 3 e 2 — as 3 quantidades de colunas usadas
  // nos breakpoints (desktop/tablet/mobile). Sem isso, a linha final fica
  // incompleta e o padrão de colunas deslocadas desalinha bem na emenda
  // entre uma cópia do período e a próxima.
  const LOOP_MULTIPLE = 30; // mmc(5, 3, 2)
  while (periodFrag.children.length % LOOP_MULTIPLE !== 0) {
    const item = PROJECTS[index % PROJECTS.length];
    const el = buildGalleryItem(item, index, { caption: false });
    el.classList.remove('reveal');
    periodFrag.appendChild(el);
    index++;
  }

  // cola DUAS cópias do período uma atrás da outra: o loop volta ao início
  // bem antes de a rolagem alcançar o fim da 1ª cópia, então sem uma 2ª
  // cópia pronta logo depois, a tela mostraria vazio por um instante ali —
  // com as duas, sempre tem foto de verdade esperando à frente.
  homeGalleryEl.appendChild(periodFrag.cloneNode(true));
  const periodHeight = homeGalleryEl.scrollHeight; // altura de 1 período só
  homeGalleryEl.appendChild(periodFrag.cloneNode(true));

  // animação de abertura: pra cada foto visível, calcula o vetor da sua
  // célula final até o centro da viewport e injeta como --tx/--ty — o CSS
  // usa esses valores como posição inicial (todas empilhadas no centro).
  // Quando o body ganha .has--finished, cada uma viaja de volta pra célula
  // com duração e delay próprios (efeito de explosão orgânica, não uníssono).
  const homeItems = [...homeGalleryEl.querySelectorAll('.g-item')];
  if (!reduce) {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    homeItems.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      const visible = r.top < window.innerHeight && r.bottom > 0;
      if (visible) {
        el.style.setProperty('--tx', (cx - (r.left + r.width / 2)).toFixed(1) + 'px');
        el.style.setProperty('--ty', (cy - (r.top + r.height / 2)).toFixed(1) + 'px');
      }
      // pseudo-aleatório determinístico por índice: durações 0.9s–1.4s,
      // delays escalonados de 0.04s a 0.13s (multiplicador de 0.01s no CSS)
      el.style.setProperty('--dur', (0.9 + ((i * 7) % 11) / 20) + 's');
      el.style.setProperty('--delay', String(4 + ((i * 5) % 10)));
    });
  }

  if (!reduce) {
    // só looping pra baixo: target nunca fica negativo, então não dá
    // pra "puxar" além do topo — mas rolando pra baixo o loop nunca acaba.
    // Com o menu de tela cheia aberto, o grid fica parado.
    let target = 0;
    let current = 0;
    const ease = 0.08;
    const navOpen = () => document.body.classList.contains('nav-open');

    window.addEventListener('wheel', e => { if (navOpen()) return; target = Math.max(0, target + e.deltaY); }, { passive: true });

    let touchStartY = 0;
    window.addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, { passive: true });
    window.addEventListener('touchmove', e => {
      const y = e.touches[0].clientY;
      if (navOpen()) { touchStartY = y; return; }
      target = Math.max(0, target + (touchStartY - y) * 1.5);
      touchStartY = y;
    }, { passive: true });

    (function raf() {
      current += (target - current) * ease;
      const wrapped = current % periodHeight;
      homeGalleryEl.style.transform = `translateY(${-wrapped}px)`;
      requestAnimationFrame(raf);
    })();
  }
}

/* ---------------- galeria: percurso pelo acervo ----------------
   A página é um trilho alto de rolagem. A posição do scroll vira um índice
   fracionário; um valor "atual" persegue esse alvo por interpolação a cada
   quadro, e é ele que decide a foto ativa, a posição da coluna e o empurrão
   horizontal de cada miniatura. A suavidade toda vem dessa perseguição —
   não há transição de CSS no transform, senão as duas brigariam.
---------------------------------------------------------------- */
function criarGaleriaScroll({
  trilhoEl, thumbsEl, focusEl, captionEl, fotos,
  legenda = item => `${item.work} · ${item.architect}, ${item.year} · foto: ${item.credit} (${item.license})`,
  rotuloThumb = item => item.work,
  alturaPorFoto = 110,
  avancoMax = 64,
  larguraCurva = 1.3,
  suavizacao = 0.1,
}) {
  // com uma foto só não há percurso: todo divisor precisa respeitar isso
  const vao = fotos.length - 1;
  const passo = () => (typeof alturaPorFoto === 'function' ? alturaPorFoto() : alturaPorFoto);

  const thumbs = [];
  const focos = [];
  fotos.forEach((item, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'galeria-thumb';
    btn.style.setProperty('--i', i); // usado pela cascata do modo índice
    btn.setAttribute('aria-label', rotuloThumb(item, i));
    const t = document.createElement('img');
    t.src = item.img;
    t.alt = '';
    btn.appendChild(t);
    btn.addEventListener('click', () => irPara(i));
    thumbsEl.appendChild(btn);
    thumbs.push(btn);

    const foco = document.createElement('div');
    foco.className = 'galeria-focus-item';
    const f = document.createElement('img');
    f.src = item.img;
    f.alt = item.alt;
    // sem lazy: a troca no scroll precisa ser instantânea
    foco.appendChild(f);
    focusEl.appendChild(foco);
    focos.push(foco);
  });

  const railTotal = () => (vao > 0 ? fotos.length * passo() + window.innerHeight : window.innerHeight);
  function medirTrilho() { trilhoEl.style.height = railTotal() + 'px'; }
  medirTrilho();

  function topoDe(i) {
    const max = railTotal() - window.innerHeight;
    return vao > 0 ? (i / vao) * max : 0;
  }
  function irPara(i) {
    window.scrollTo({ top: topoDe(i), behavior: reduce ? 'auto' : 'smooth' });
  }
  /* teleporte: rola sem animação E sincroniza o lerp na mesma operação, senão
     o cross-fade varre todas as fotos do caminho até chegar na escolhida */
  function posicionar(i) {
    window.scrollTo({ top: topoDe(i), behavior: 'auto' });
    atual = i;
    desenhar(i);
  }

  /* centro de cada miniatura na coluna, para poder alinhá-la ao meio da tela.
     As alturas variam com a proporção de cada foto, então são medidas — e
     remedidas quando as imagens terminam de carregar ou a janela muda. */
  let centros = [];
  function medirCentros() {
    centros = thumbs.map(t => t.offsetTop + t.offsetHeight / 2);
  }
  function remedir() { medirCentros(); medirTrilho(); }
  medirCentros();
  window.addEventListener('load', remedir);
  window.addEventListener('resize', () => { if (!pausado) remedir(); });

  let atual = 0;
  let ativoAnterior = -1;
  let pausado = false;

  function desenhar(indice) {
    const n = fotos.length;
    const piso = Math.max(0, Math.min(n - 1, Math.floor(indice)));
    const teto = Math.min(n - 1, piso + 1);
    const fracao = indice - piso;

    /* posição e avanço saem como custom properties, não como transform inline:
       assim as regras de estado (modo índice) vencem por serem CSS contra CSS,
       em vez de disputar com um estilo inline reescrito a cada quadro */
    const centro = centros[piso] + (centros[teto] - centros[piso]) * fracao;
    thumbsEl.style.setProperty('--deslocamento', (window.innerHeight / 2 - centro) + 'px');

    // curva de sino: a miniatura ativa avança ao máximo, as vizinhas bem menos
    thumbs.forEach((t, i) => {
      const d = i - indice;
      t.style.setProperty('--avanco', (avancoMax * Math.exp(-(d * d) / larguraCurva)) + 'px');
    });

    const ativo = Math.round(indice);
    if (ativo !== ativoAnterior) {
      thumbs.forEach((t, i) => t.classList.toggle('is-active', i === ativo));
      focos.forEach((f, i) => f.classList.toggle('is-active', i === ativo));
      if (captionEl) captionEl.textContent = legenda(fotos[ativo], ativo);
      ativoAnterior = ativo;
    }
  }

  function alvo() {
    const max = railTotal() - window.innerHeight;
    return (vao > 0 && max > 0) ? (window.scrollY / max) * vao : 0;
  }

  if (reduce || vao === 0) {
    desenhar(0);
    if (vao > 0) window.addEventListener('scroll', () => desenhar(alvo()), { passive: true });
  } else {
    (function raf() {
      if (!pausado) {
        atual += (alvo() - atual) * suavizacao;
        desenhar(atual);
      }
      requestAnimationFrame(raf);
    })();
  }

  return {
    irPara, posicionar, remedir,
    indiceAtivo: () => Math.round(atual),
    pausar() { pausado = true; },
    /* a ordem importa: só dá pra medir os centros depois que o layout voltou
       a ser coluna, senão guardamos as posições da grade e a coluna salta */
    retomar() {
      void thumbsEl.offsetHeight; // força o reflow antes de medir
      medirCentros();
      medirTrilho();
      atual = alvo();
      ativoAnterior = -1;
      desenhar(atual);
      pausado = false;
    },
  };
}

const galeriaThumbsEl = document.getElementById('galeria-thumbs');
if (galeriaThumbsEl) {
  criarGaleriaScroll({
    trilhoEl: document.getElementById('galeria'),
    thumbsEl: galeriaThumbsEl,
    focusEl: document.getElementById('galeria-focus'),
    captionEl: document.getElementById('galeria-caption'),
    fotos: PROJECTS,
  });
}

/* ---------------- página da obra: mesma galeria + Info e Índice ---------------- */
const projetoThumbsEl = document.getElementById('projeto-thumbs');
if (projetoThumbsEl) {
  const slug = new URLSearchParams(location.search).get('p');
  const group = PROJECT_GROUPS.find(g => g.slug === slug) || PROJECT_GROUPS[0];
  const total = group.photos.length;

  document.getElementById('project-page-title').textContent = `${group.name} — ${group.architect}`;

  const galeria = criarGaleriaScroll({
    trilhoEl: document.getElementById('projeto'),
    thumbsEl: projetoThumbsEl,
    focusEl: document.getElementById('projeto-focus'),
    captionEl: document.getElementById('projeto-caption'),
    fotos: group.photos,
    // com 2 a 5 fotos, uma altura fixa por foto daria um percurso curto demais
    alturaPorFoto: () => window.innerHeight * 0.7,
    rotuloThumb: (_, i) => `${group.name} — foto ${i + 1} de ${total}`,
    legenda: (foto, i) => `${group.name} · foto ${i + 1}/${total} · ${foto.credit} (${foto.license})`,
  });

  /* ---- ficha técnica (Info) ---- */
  const infoEl = document.getElementById('projeto-info');
  document.getElementById('projeto-info-obra').textContent = group.name;
  document.getElementById('projeto-info-autoria').textContent =
    `${group.architect} · ${group.year} · ${group.city}`;
  document.getElementById('projeto-info-fotos').textContent =
    total === 1 ? '1 fotografia' : `${total} fotografias`;

  /* os créditos ficam fora do splitLines: ele zera o textContent e destruiria
     os links de licença. Cada linha é montada à mão, com o mesmo escalonamento. */
  const creditosEl = document.getElementById('projeto-info-creditos');
  const vistos = new Set();
  group.photos.forEach(foto => {
    const chave = foto.credit + '|' + foto.license;
    if (vistos.has(chave)) return;
    vistos.add(chave);
    const linha = document.createElement('p');
    linha.className = 'line';
    const inner = document.createElement('span');
    inner.className = 'line__inner';
    inner.innerHTML = `foto: ${foto.credit} · <a href="${foto.source}" target="_blank" rel="noopener">${foto.license}</a>`;
    linha.appendChild(inner);
    creditosEl.appendChild(linha);
  });

  function escalonarInfo() {
    [...infoEl.querySelectorAll('.line__inner')].forEach((el, i) => {
      el.style.transitionDelay = (0.08 + i * 0.045) + 's';
    });
  }

  /* ---- alternância dos dois estados ---- */
  const infoBtn = document.getElementById('projeto-info-btn');
  const indexBtn = document.getElementById('projeto-index-btn');
  const body = document.body;

  function marcar(btn, ligado) { btn.setAttribute('aria-pressed', String(ligado)); }

  function abrirInfo() {
    fecharIndex();
    body.classList.add('is-info');
    marcar(infoBtn, true);
    // medir com o painel já visível, senão a largura é zero e vira uma linha só
    if (!reduce) {
      infoEl.querySelectorAll('.projeto-info-obra, .projeto-info-linha')
            .forEach(p => splitLines(p, { passo: 0.045 }));
    }
    escalonarInfo();
  }
  function fecharInfo() {
    body.classList.remove('is-info');
    marcar(infoBtn, false);
  }
  function abrirIndex() {
    fecharInfo();
    galeria.pausar();
    body.classList.add('is-index');
    marcar(indexBtn, true);
  }
  function fecharIndex() {
    if (!body.classList.contains('is-index')) return;
    body.classList.remove('is-index');
    marcar(indexBtn, false);
    galeria.retomar();
  }

  infoBtn.addEventListener('click', () => {
    body.classList.contains('is-info') ? fecharInfo() : abrirInfo();
  });
  indexBtn.addEventListener('click', () => {
    body.classList.contains('is-index') ? fecharIndex() : abrirIndex();
  });

  /* clicar numa miniatura no modo índice fecha a grade e salta pra foto —
     posicionar() teleporta em vez de rolar, pra não varrer as do caminho */
  projetoThumbsEl.addEventListener('click', e => {
    if (!body.classList.contains('is-index')) return;
    const btn = e.target.closest('.galeria-thumb');
    if (!btn) return;
    const i = [...projetoThumbsEl.children].indexOf(btn);
    fecharIndex();
    requestAnimationFrame(() => galeria.posicionar(i));
  }, true);

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (body.classList.contains('is-info')) fecharInfo();
    else if (body.classList.contains('is-index')) fecharIndex();
  });

  const backLink = document.getElementById('project-back');
  backLink.addEventListener('click', e => {
    if (document.referrer && new URL(document.referrer).host === location.host) {
      e.preventDefault();
      if (reduce) { history.back(); return; }
      document.body.classList.remove('has--finished');
      document.body.classList.add('is-leaving');
      setTimeout(() => history.back(), 450);
    }
  });
}

/* site é só a versão off-white/colorida — sem modo escuro nem monocromático;
   limpa qualquer preferência antiga que ainda esteja salva no navegador */
localStorage.removeItem('theme');
localStorage.removeItem('monochrome');
root.dataset.theme = 'light';
root.classList.remove('is-monochrome');

/* ---------------- navscreen: menu de tela cheia (botão +/×) ---------------- */
/* quebra o parágrafo em linhas medidas de verdade (por offsetTop) e embrulha
   cada uma em .line > .line__inner pro reveal linha a linha.
   ATENÇÃO: zera o textContent, então destrói qualquer elemento filho — não
   passe por aqui um trecho que contenha link. Precisa ser chamada com o
   elemento já visível, senão a largura é zero e tudo vira uma linha só. */
function splitLines(el, { base = 0.08, passo = 0.06 } = {}) {
  if (!el || el.dataset.split === '1') return;
  const words = el.textContent.trim().split(/\s+/);
  el.textContent = '';
  const probe = words.map(w => {
    const s = document.createElement('span');
    s.style.display = 'inline-block';
    s.textContent = w;
    el.appendChild(s);
    el.appendChild(document.createTextNode(' '));
    return s;
  });
  const lines = [];
  let lastTop = null;
  probe.forEach(s => {
    const t = s.offsetTop;
    if (lastTop === null || t - lastTop > 1) { lines.push([]); lastTop = t; }
    lines[lines.length - 1].push(s.textContent);
  });
  el.textContent = '';
  lines.forEach((ws, i) => {
    const line = document.createElement('span');
    line.className = 'line';
    const inner = document.createElement('span');
    inner.className = 'line__inner';
    inner.style.transitionDelay = (base + i * passo) + 's';
    inner.textContent = ws.join(' ');
    line.appendChild(inner);
    el.appendChild(line);
  });
  el.dataset.split = '1';
}

const navOpener = document.getElementById('nav-opener');
const navscreen = document.getElementById('navscreen');
if (navOpener && navscreen) {
  const aboutEl = navscreen.querySelector('.navscreen-about');
  let closeTimer = null;

  function openNav() {
    clearTimeout(closeTimer);
    navOpener.setAttribute('aria-expanded', 'true');
    navscreen.hidden = false;
    if (!reduce) splitLines(aboutEl); // só depois de visível, pra medir larguras reais
    requestAnimationFrame(() => {
      navscreen.classList.add('is-open');
      document.body.classList.add('nav-open');
    });
  }
  function closeNav() {
    navOpener.setAttribute('aria-expanded', 'false');
    navscreen.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    closeTimer = setTimeout(() => { navscreen.hidden = true; }, 600);
  }
  navOpener.addEventListener('click', () => {
    navscreen.hidden ? openNav() : closeNav();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !navscreen.hidden) closeNav();
  });
}

/* ---------------- transição de página com blur ---------------- */
/* entrada: todo documento nasce sob o véu borrado e o dissolve logo após
   o primeiro frame (na home isso também dispara a explosão do grid) */
requestAnimationFrame(() => {
  setTimeout(() => document.body.classList.add('has--finished'), 60);
});

/* volta via bfcache (botão voltar): garante estado limpo */
window.addEventListener('pageshow', e => {
  if (e.persisted) {
    document.body.classList.remove('is-leaving');
    document.body.classList.add('has--finished');
  }
});

/* saída: intercepta cliques em links internos, borra a tela e só então navega */
document.addEventListener('click', e => {
  if (e.defaultPrevented || reduce) return;
  const a = e.target.closest('a');
  if (!a || !a.href || a.target === '_blank') return;
  let url;
  try { url = new URL(a.href, location.href); } catch { return; }
  if (url.origin !== location.origin) return;
  if (url.pathname === location.pathname && url.search === location.search) return;
  e.preventDefault();
  document.body.classList.remove('has--finished');
  document.body.classList.add('is-leaving');
  setTimeout(() => { location.href = url.href; }, 450);
});

/* revelação no scroll dos elementos estáticos da página */
document.querySelectorAll('.reveal:not(.g-item)').forEach((el, i) => observeReveal(el, i));
