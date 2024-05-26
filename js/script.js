// Función para obtener los jugadores del localStorage
const obtenerJugadoresLocalStorage = () => {
    const jugadoresString = localStorage.getItem('jugadores');
    return jugadoresString ? JSON.parse(jugadoresString) : [];
};

// Función para guardar los jugadores en el localStorage
const guardarJugadoresLocalStorage = (jugadores) => {
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
};

// Función asíncrona para agregar un nuevo jugador al equipo usando un prompt de HTML
const agregarJugador = async () => {
    try {
        // Solicitar al usuario que ingrese los datos del jugador
        const nombre = prompt("Ingrese el nombre del jugador:");
        const edad = parseInt(prompt("Ingrese la edad del jugador:"));
        const posicion = prompt("Ingrese la posición del jugador:");
        const estado = prompt("Ingrese el del jugador:");

        // Obtener los jugadores del localStorage
        let jugadores = obtenerJugadoresLocalStorage();

        // Verificar si el jugador ya existe en el equipo
        const jugadorExistente = jugadores.find(jugador => jugador.nombre === nombre);
        if (jugadorExistente) {
            throw new Error('El jugador ya está en el equipo.');
        }

        if (estado!= "titular" && estado!= "suplente"){
            throw new Error('El estado no es valido.');
        }
        // Agregar el nuevo jugador al array de jugadores
        jugadores.push({ nombre, edad, posicion, estado});

        // Guardar los jugadores actualizados en el localStorage
        guardarJugadoresLocalStorage(jugadores);

        // Simular una demora de 1 segundo para la operación asíncrona
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mostrar un mensaje de éxito
        alert('Jugador agregado correctamente.');
    } catch (error) {
        console.error('Error:', error.message);
        alert(`Error: ${error.message}`);
    }
};

// Función asíncrona para listar todos los jugadores del equipo
const listarJugadores = async () => {
    try {
        const jugadores = obtenerJugadoresLocalStorage();
        if (jugadores.length === 0) {
            alert("No hay jugadores en el equipo.");
        } else {
            let listado = "Jugadores del equipo:\n";
            jugadores.forEach(jugador => {
                listado += `Nombre: ${jugador.nombre}, Edad: ${jugador.edad}, Posición: ${jugador.posicion}, Estado: ${jugador.estado}\n`;
            });
            alert(listado);
        }
    } catch (error) {
        console.error('Error:', error.message);
        alert(`Error: ${error.message}`);
    }
};

// Función asíncrona para asignar una nueva posición a un jugador
const asignarPosicion = async () => {
    try {
        const nombreJugador = prompt("Ingrese el nombre del jugador para asignar posición:");
        const nuevaPosicion = prompt("Ingrese la nueva posición del jugador:");
        let posicionesValidas = ["delantero", "centrocampista", "defensor", "portero"]

        let jugadores = obtenerJugadoresLocalStorage();

        const jugador = jugadores.find(j => j.nombre === nombreJugador);
        if (!jugador) {
            throw new Error('Jugador no encontrado.');
        }

        const posicionValida = posicionesValidas.find(posicion => posicion === nuevaPosicion.toLowerCase());
        if (posicionValida) {
            jugador.posicion = nuevaPosicion;
            alert(`Posición de ${nombreJugador} actualizada a ${nuevaPosicion}.`);
        } else {
            throw new Error("Esta posicion no es valida")
        }
        


        guardarJugadoresLocalStorage(jugadores);

        await new Promise(resolve => setTimeout(resolve, 1000));

        
    } catch (error) {
        console.error('Error:', error.message);
        alert(`Error: ${error.message}`);
    }
};

// Función asíncrona para realizar un cambio durante un partido
const realizarCambio = async () => {
    try {
        const jugadorEntrante = prompt("Ingrese el nombre del jugador que entrará:");
        const jugadorSaliente = prompt("Ingrese el nombre del jugador que saldrá:");

        let jugadores = obtenerJugadoresLocalStorage();

        const entrante = jugadores.find(j => j.nombre === jugadorEntrante);
        const saliente = jugadores.find(j => j.nombre === jugadorSaliente);

        if (!entrante) {
            throw new Error(`El jugador entrante ${jugadorEntrante} no está en el equipo.`);
        }
        if (!saliente) {
            throw new Error(`El jugador saliente ${jugadorSaliente} no está en el equipo.`);
        }
        if (entrante.estado !== 'suplente') {
            throw new Error(`El jugador entrante ${jugadorEntrante} no está disponible para ingresar.`);
        }
        if (saliente.estado !== 'titular') {
            throw new Error(`El jugador saliente ${jugadorSaliente} no está en el campo.`);
        }

        entrante.estado = 'titular';
        saliente.estado = 'suplente';

        guardarJugadoresLocalStorage(jugadores);

        await new Promise(resolve => setTimeout(resolve, 1000));

        alert(`Cambio realizado: ${jugadorEntrante} entra por ${jugadorSaliente}.`);
    } catch (error) {
        console.error('Error:', error.message);
        alert(`Error: ${error.message}`);
    }
};


