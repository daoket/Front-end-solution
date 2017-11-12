// 简写
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Composites = Matter.Composites,
    Body = Matter.Body,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Common = Matter.Common,
    Events = Matter.Events;


// 创建引擎
var engine = Engine.create();

// 创建渲染器
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes : false
    }
});

// 墙壁
var offset = 5;
World.add(engine.world, [
    Bodies.rectangle(400, -offset, 800.5 + 2 * offset, 50.5, { isStatic: true }), // 上墙
    Bodies.rectangle(400, 600 + offset, 800.5 + 2 * offset, 50.5, { isStatic: true }), // 下墙
    Bodies.rectangle(800 + offset, 300, 50.5, 600.5 + 2 * offset, { isStatic: true }), // 右墙
    Bodies.rectangle(-offset, 300, 50.5, 600.5 + 2 * offset, { isStatic: true }) // 左墙
]);

// 鼠标约束
var mouseConstraint = MouseConstraint.create(engine, {
    element: render.canvas
});

World.add(engine.world, mouseConstraint);

// 运行引擎
Engine.run(engine);
Render.run(render);
