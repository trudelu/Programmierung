const { Engine, Render, Runner, Bodies, World, Composites, Events, Body, Mouse, MouseConstraint } = Matter;

const engine = Engine.create();
const world = engine.world;

const render = Render.create({
    element: document.body,
    canvas: document.getElementById('world'),
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: '#282c34'
    }
});

Render.run(render);
Runner.run(Runner.create(), engine);

// Erstelle den weichen Ball (Schleim-Effekt)
const ballRadius = 2;
const particleRadius = 17;
const ball = Composites.softBody(400, 200, 10, 10, 0, 0, true, particleRadius, {
    friction: 0.05,
    frictionAir: 0.05,
    restitution: 0.9,
    render: {
        fillStyle: 'indigo'
    }
}, {
    stiffness: 0.1,
    damping: 0.1
});

World.add(world, ball);

// Erstelle die Plattform
const platform = Bodies.rectangle(400, 600, 810, 60, { isStatic: true });
World.add(world, platform);

// Steuerung des Balls
document.addEventListener('keydown', (event) => {
    const forceMagnitude = 0.02 * ball.bodies[0].mass;

    switch(event.code) {
        case 'ArrowUp':
            ball.bodies.forEach(body => Body.applyForce(body, body.position, { x: 0, y: -forceMagnitude }));
            break;
        case 'ArrowDown':
            ball.bodies.forEach(body => Body.applyForce(body, body.position, { x: 0, y: forceMagnitude }));
            break;
        case 'ArrowLeft':
            ball.bodies.forEach(body => Body.applyForce(body, body.position, { x: -forceMagnitude, y: 0 }));
            break;
        case 'ArrowRight':
            ball.bodies.forEach(body => Body.applyForce(body, body.position, { x: forceMagnitude, y: 0 }));
            break;
    }
});

// Maussteuerung hinzufügen
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});

World.add(world, mouseConstraint);

// Grenzen des Spielfelds
const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
const leftWall = Bodies.rectangle(-10, 300, 60, 600, { isStatic: true });
const rightWall = Bodies.rectangle(810, 300, 60, 600, { isStatic: true });
const ceiling = Bodies.rectangle(400, -10, 810, 60, { isStatic: true });

World.add(world, [ground, leftWall, rightWall, ceiling]);

// Fenstergröße anpassen
window.addEventListener('resize', () => {
    render.canvas.width = window.innerWidth;
    render.canvas.height = window.innerHeight;
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: window.innerWidth, y: window.innerHeight }
    });
});

// Halte die Kugel innerhalb des Fensters
Events.on(engine, 'afterUpdate', () => {
    ball.bodies.forEach(body => {
        if (body.position.y >= render.canvas.height - particleRadius) {
            Body.setPosition(body, { x: body.position.x, y: render.canvas.height - particleRadius });
        }
        if (body.position.x >= render.canvas.width - particleRadius) {
            Body.setPosition(body, { x: render.canvas.width - particleRadius, y: body.position.y });
        }
        if (body.position.x <= particleRadius) {
            Body.setPosition(body, { x: particleRadius, y: body.position.y });
        }
    });
});