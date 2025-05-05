function determinarTurno(hora) {
    if (hora >= 7 && hora <= 11) return 'desayuno';
    if (hora >= 13 && hora <= 16) return 'almuerzo';
    if (hora >= 19 && hora <= 23) return 'cena';
    return null;
  }
  
  function mostrarMenu(turno) {
    if (turno === 'desayuno') return menuBreakfast;
    if (turno === 'almuerzo') return menuLunch;
    if (turno === 'cena') return menuDinner;
    return null;
  }
  
  function solicitarHora() {
    const horaStr = prompt("Bienvenid@s! ¿A qué hora desea/n comer? (Ingrese/n la hora en formato HH:mm, por ejemplo, 14:30, 20:00)");
    if (!horaStr) {
      alert("Entrada vacía, por favor intente nuevamente.");
      return solicitarHora();
    }
    const horaNum = parseFloat(horaStr.replace(',', '.'));
    if (isNaN(horaNum) || horaNum < 0 || horaNum >= 24) {
      alert("Por favor, ingrese una hora válida entre 0 y 23");
      return solicitarHora();
    }
    return horaNum;
  }
  
  
  function normalizarTexto(texto) {
    return texto.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, '')
      .trim();
  }
  
  
  function seleccionarPlatoPorNombre(platos, tipoPlato) {
    let seleccionValida = false;
    let platoElegido = '';
  
    const mensajeOpciones = 'Opciones disponibles:\n' + platos.join('\n');
  
    while (!seleccionValida) {
      const seleccionStr = prompt(`Seleccione su ${tipoPlato} escribiendo el nombre o parte del nombre:\n${mensajeOpciones}`);
      if (!seleccionStr) {
        alert("Entrada vacía, por favor intente nuevamente.");
        continue;
      }
      const seleccionNormalizada = normalizarTexto(seleccionStr);
      const coincidencias = platos
        .map(plato => ({ original: plato, normalizado: normalizarTexto(plato) }))
        .filter(p => p.normalizado.includes(seleccionNormalizada));
  
      if (coincidencias.length === 1) {
        platoElegido = coincidencias[0].original;
        seleccionValida = true;
      } else if (coincidencias.length > 1) {
        alert("Varios platos coinciden con su entrada. Por favor sea más específico.");
      } else {
        alert("No se encontró ningún plato que coincida con su búsqueda, intente nuevamente.");
      }
    }
  
    const mensajes = [
      "¡Eso está delicioso!",
      "¡Apetecible!",
      "Buena elección",
      "Uno de nuestros mejores platos, será un honor servirle ese plato."
    ];
    const mensajeRandom = mensajes[Math.floor(Math.random() * mensajes.length)];
    alert(mensajeRandom);
  
    return platoElegido;
  }
  
  
  function obtenerPrecio(plato) {
    const precioMatch = plato.match(/([\d.,]+)€/);
    if (precioMatch && precioMatch[1]) {
      const precioStr = precioMatch[1].replace(',', '.');
      return parseFloat(precioStr);
    }
    return 0;
  }
  
  
  const menuBreakfast = {
    Primero: ["Café (1.5€)", "Cola-cao (1.5€)", "Zumo de naranja (2€)"],
    Segundo: ["Bollo (1€)", "Pincho (1.5€)", "Trozo de tarta (1€)"],
    Postre: ["Zumo de naranja (2€)", "Yoghurt (0.75€)", "Pincho (1.5€)"]
  };
  
  const menuLunch = {
    Primero: ["Arroz (3€)", "Alubias Rojas con sacramentos (5€)", "Plato Jamón Ibérico (18€)"],
    Segundo: ["Rodaballo al horno (7€)", "Gambas al ajíllo (7.5€)", "Chuletón a la brasa 1.2kg (35€)"],
    Postre: ["Tarta de queso (3€)", "Surtido de Helados (5€)", "Volcán de Chocolate (8€)"]
  };
  
  const menuDinner = {
    Primero: ["Ensalada de la huerta (2€)", "Sopa de la abuela (2.5€)", "Pure de calabacín (2€)"],
    Segundo: ["Pechugas de pollo a la plancha con patatas (5€)", "Revuelto de hongos (7.5€)", "Dorada al horno con patatas panaderas (10€)"],
    Postre: ["Yoghurt (0.75€)", "Copa Valenciana (10€)", "Surtido de Helados (5€)"]
  };
  
  function main() {
    let hora;
    let turno;
  
    do {
      hora = solicitarHora();
      turno = determinarTurno(hora);
      if (!turno) {
        alert("En ese horario no estamos disponibles. Por favor, intente en otro momento.");
      }
    } while (!turno);
  
    const menu = mostrarMenu(turno);
    const nombreMenu = turno;
  
    let totalFactura = 0;
  
    const primerPlato = seleccionarPlatoPorNombre(menu.Primero, "primer plato");
    totalFactura += obtenerPrecio(primerPlato);
  
  
    const segundoPlato = seleccionarPlatoPorNombre(menu.Segundo, "segundo plato");
    totalFactura += obtenerPrecio(segundoPlato);
  
  
    const postre = seleccionarPlatoPorNombre(menu.Postre, "postre");
    totalFactura += obtenerPrecio(postre);
    
  
    alert(`Su factura total es: €${totalFactura.toFixed(2)}`);
    alert("Gracias por haber comido en nuestro restaurante. ¡Que pase un agradable día!");
  }
  
  main();
  
  
