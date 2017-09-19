let xRoute = yRoute = zRoute = 0,
    permissionGoDefault = true;

(function () {
    let x = y = z = 0;
    xRoute = yRoute = zRoute = 0;

    document.onkeydown = function (element) {
        if (element.keyCode === 65) y += 0.04;
        if (element.keyCode === 83) x -= 0.04;
        if (element.keyCode === 68) y -= 0.04;
        if (element.keyCode === 87) x += 0.04;
        if (element.keyCode === 81) z -= 0.04;
        if (element.keyCode === 69) z += 0.04;

        let transformMatrixCube = matrixTransform.multiplyArrayOfMatrices([
            matrixTransform.rotateAroundZAxis(Math.PI * z),
            matrixTransform.rotateAroundXAxis(Math.PI * x),
            matrixTransform.rotateAroundYAxis(Math.PI * y)
        ]);
        document.getElementById('cube-other').style.transform = matrixTransform.matrixArrayToCssMatrix(transformMatrixCube);
    }
})()

let sides = [
  {
    side: document.getElementById('front'),
    X: 0.5,
    Y: 1,
    Z: 1
  },
  {
    side: document.getElementById('back'),
    X: 1,
    Y: 0.3,
    Z: 0.6
  },
  {
    side: document.getElementById('right'),
    X: 0.3,
    Y: 1,
    Z: 1
  },
  {
    side: document.getElementById('left'),
    X: 0.6,
    Y: 1,
    Z: 0.3,
  },
  {
    side: document.getElementById('top'),
    X: 0.8,
    Y: 0.51,
    Z: 1,
  },
  {
    side: document.getElementById('bottom'),
    X: 0.2,
    Y: 1.3,
    Z: 0.5,
  }
]

let matrixTransform = {};
matrixTransform.multiplyMatrixAndPoint = function(matrix, point) {
    return [
        (point[0] * matrix[0]) + (point[1] * matrix[4]) + (point[2] * matrix[8]) + (point[3] * matrix[12]),
        (point[0] * matrix[1]) + (point[1] * matrix[5]) + (point[2] * matrix[9]) + (point[3] * matrix[13]),
        (point[0] * matrix[2]) + (point[1] * matrix[6]) + (point[2] * matrix[10]) + (point[3] * matrix[14]),
        (point[0] * matrix[3]) + (point[1] * matrix[7]) + (point[2] * matrix[11]) + (point[3] * matrix[15])
    ];
}

matrixTransform.multiplyMatrices = function(matrixFirst, matrixSecond) {
    let column = [],
        result = [];

    for (let i = 0; i < 4; i++) {
        column[i] = [matrixSecond[i], matrixSecond[i + 4], matrixSecond[i + 8], matrixSecond[i + 12]];
    }
    for (let i = 0; i < column.length; i++) {
        result[i] = matrixTransform.multiplyMatrixAndPoint(matrixFirst, column[i])
    }

    return [
        result[0][0], result[1][0], result[2][0], result[3][0],
        result[0][1], result[1][1], result[2][1], result[3][1],
        result[0][2], result[1][2], result[2][2], result[3][2],
        result[0][3], result[1][3], result[2][3], result[3][3]
    ];
}

matrixTransform.rotateAroundXAxis = function(a) {
    let sin = Math.sin,
        cos = Math.cos;
    return [
         1,       0,        0, 0,
         0,  cos(a),  -sin(a), 0,
         0,  sin(a),   cos(a), 0,
         0,       0,        0, 1
    ];
}

matrixTransform.rotateAroundYAxis = function(a) {
    let sin = Math.sin,
        cos = Math.cos;
    return [
       cos(a), 0, sin(a), 0,
            0, 1,      0, 0,
      -sin(a), 0, cos(a), 0,
            0, 0,      0, 1
    ];
}

matrixTransform.rotateAroundZAxis = function(a) {
    let sin = Math.sin,
        cos = Math.cos;
    return [
      cos(a), -sin(a), 0, 0,
      sin(a),  cos(a), 0, 0,
           0,       0, 1, 0,
           0,       0, 0, 1
    ];
}

matrixTransform.translate = function(x, y, z) {
  	return [
  	    1, 0, 0, 0,
  	    0, 1, 0, 0,
  	    0, 0, 1, 0,
  	    x, y, z, 1
  	];
}

matrixTransform.scale = function(w, h, d) {
  	return [
  	    w, 0, 0, 0,
  	    0, h, 0, 0,
  	    0, 0, d, 0,
  	    0, 0, 0, 1
  	];
}
matrixTransform.multiplyArrayOfMatrices = function (matrices) {
  var inputMatrix = matrices[0];

  for(let i = 1; i < matrices.length; i++) {
      inputMatrix = matrixTransform.multiplyMatrices(inputMatrix, matrices[i]);
  }
  return inputMatrix;
}

matrixTransform.matrixArrayToCssMatrix = function(array) {
  sides[Math.floor(Math.random() * (6 - 0))].side.style.backgroundColor = 'rgb(' + Math.floor(Math.random() * (255 - 0)) + ', ' + Math.floor(Math.random() * (255 - 0)) + ', ' + Math.floor(Math.random() * (255 - 0)) + ')'
  return 'matrix3d(' + array.join(',') + ')';
}


function goDefault() {
    let property = Math.floor(Math.random() * (4 - 1)) + 1;
    switch (property) {
        case 1: xRoute += 0.01;
            break;
        case 2: yRoute += 0.01;
            break;
        default: zRoute += 0.01;
    }
    let transformMatrixCube = matrixTransform.multiplyArrayOfMatrices([
        matrixTransform.rotateAroundZAxis(Math.PI * zRoute),
        matrixTransform.rotateAroundXAxis(Math.PI * xRoute),
        matrixTransform.rotateAroundYAxis(Math.PI * yRoute)
    ]);
    document.getElementById('cube-other').style.transform = matrixTransform.matrixArrayToCssMatrix(transformMatrixCube);
    if (permissionGoDefault) {
        setTimeout(function () {
            goDefault()
        }, 100);
    }
}
function goDefaultStop() {
    permissionGoDefault = false;
}
function goDefaultAllow() {
    permissionGoDefault = true;
}

let move = {},
    x = y = z = 0,
    permissionForMove = true;
move.leftRigth = function(message) {
    if (message === 'left') {
        yRoute += 0.01;
    } else {
        yRoute -= 0.01;
    }
    let transformMatrixCube = matrixTransform.multiplyArrayOfMatrices([
        matrixTransform.rotateAroundZAxis(Math.PI * zRoute),
        matrixTransform.rotateAroundXAxis(Math.PI * xRoute),
        matrixTransform.rotateAroundYAxis(Math.PI * yRoute)
    ]);
    document.getElementById('cube-other').style.transform = matrixTransform.matrixArrayToCssMatrix(transformMatrixCube);
    if (permissionForMove) {
        setTimeout(function () {
            move.leftRigth(message)
        }, 100);
    } else {
        alert('You need to press Allow Move button!');
    }
}

move.upDown = function(message) {
    if (message === 'up') {
        xRoute += 0.01;
    } else {
        xRoute -= 0.01;
    }
    let transformMatrixCube = matrixTransform.multiplyArrayOfMatrices([
        matrixTransform.rotateAroundZAxis(Math.PI * zRoute),
        matrixTransform.rotateAroundXAxis(Math.PI * xRoute),
        matrixTransform.rotateAroundYAxis(Math.PI * yRoute)
    ]);
    document.getElementById('cube-other').style.transform = matrixTransform.matrixArrayToCssMatrix(transformMatrixCube);
    if (permissionForMove) {
        setTimeout(function () {
            move.upDown(message)
        }, 100);
    } else {
        alert('You need to press Allow Move button!');
    }
}

move.zRout = function(message) {
    if (message === 'up') {
        zRoute += 0.01;
    } else {
        zRoute -= 0.01;
    }
    let transformMatrixCube = matrixTransform.multiplyArrayOfMatrices([
        matrixTransform.rotateAroundZAxis(Math.PI * zRoute),
        matrixTransform.rotateAroundXAxis(Math.PI * xRoute),
        matrixTransform.rotateAroundYAxis(Math.PI * yRoute)
    ]);
    document.getElementById('cube-other').style.transform = matrixTransform.matrixArrayToCssMatrix(transformMatrixCube);
    if (permissionForMove) {
        setTimeout(function () {
            move.zRout(message)
        }, 100);
    } else {
        alert('You need to press Allow Move button!');
    }
}

move.stopMove = function() {
    permissionForMove = false;
}
move.allowMove = function() {
    permissionForMove = true;
}


let cubePower = {};

cubePower.createCube = function() {
    let sideFront = document.getElementById('front'),
        sideBack = document.getElementById('back'),
        sideRight = document.getElementById('right'),
        sideLeft = document.getElementById('left'),
        sideTop = document.getElementById('top'),
        sideBottom = document.getElementById('bottom');
    cubePower.connectSide(sideFront, [
        1,    0,    0,    0,
        0,    1,    0,    0,
        0,    0,    1,    0,
        0,   0,    150,  1
    ], 1, 1, 1, 1, 1, 1);
    cubePower.connectSide(sideBack, [
        -1,   0,    0,      0,
        0,    1,    0,      0,
        0,    0,    -1,     0,
        0,    0,    -150,   1
    ], 1, 1, 1, 1, 1, 1);
    cubePower.connectSide(sideRight, [
        0,    0,    -1,   0,
        0,    1,    0,    0,
        1,    0,    0,    0,
        150,  0,    0,    1
    ], 1, 1, 1, 1, 1, 1);
    cubePower.connectSide(sideLeft, [
        0,    0,    1,   0,
        0,    1,    0,    0,
        -1,   0,    0,    0,
        -150, 0,    0,    1
    ], 1, 1, 1, 1, 1, 1);
    cubePower.connectSide(sideTop, [
        1,    0,    0,    0,
        0,    0,    1,    0,
        0,    -1,   0,    0,
        0,    -150, 0,    1
    ], 1, 1, 1, 1, 1, 1);
    cubePower.connectSide(sideBottom, [
        1,    0,    0,    0,
        0,    0,    -1,   0,
        0,    1,    0,    0,
        0,     150, 0,    1
    ], 1, 1, 1, 1, 1, 1);
    console.log(sideFront.style);
}
Array.prototype.shuffle = function() {
    return this.sort(function() {
        return 0.5 - Math.random();
    });
};
cubePower.destroyCube = function() {
    let matrixResults = [
      [
          1,    0,    0,    0,
          0,    Math.random() * (1 - 0),    0,    0,
          0,    0,    Math.floor(Math.random() * (1000 - 600)) + 600,    0,
          Math.floor(Math.random() * (400 - 150)) + 150,  Math.floor(Math.random() * (200 - 50)) + 50,  Math.floor(Math.random() * (100 - 50)) + 50,    1
      ],
      [
          Math.random() * (0.9 - 0.1),    0,    0,    0,
          0,    Math.random() * (0.9 - 0.1),    0,    0,
          0,    0,    Math.random() * (0.9 - 0.1),    0,
          -1 * Math.floor(Math.random() * (2200 - 1500)) + 1500,  Math.floor(Math.random() * (600 - 250)) + 250,  -1 * Math.floor(Math.random() * (800 - 600)) + 600,    1
      ],
      [
        Math.random() * (0.9 - 0.1),    0,    0,    0,
        0,    Math.random() * (0.9 - 0.1),    0,    0,
        0,    0,    Math.random() * (0.9 - 0.1),    0,
        -1 * (Math.floor(Math.random() * (700 - 250)) + 250),  Math.floor(Math.random() * (600 - 125)) + 125,  Math.floor(Math.random() * (200 - 10)) + 10,    1
      ],
      [
        Math.random() * (0.9 - 0.1),    0,    0,    0,
        0,    Math.random() * (0.9 - 0.1),    0,    0,
        0,    0,    Math.random() * (0.9 - 0.1),    0,
        -1 * (Math.floor(Math.random() * (500 - 150)) + 150),  -1 * (Math.floor(Math.random() * (400 - 75)) + 75),  Math.floor(Math.random() * (200 - 10)) + 10,    1
          -300,  -200,  100,  1
      ],
      [
        Math.random() * (0.9 - 0.1),    0,    0,    0,
        0,    Math.random() * (0.9 - 0.1),    0,    0,
        0,    0,    Math.random() * (0.9 - 0.1),    0,
        Math.floor(Math.random() * (600 - 250)) + 250,  -1 * (Math.floor(Math.random() * (500 - 125)) + 125),  Math.floor(Math.random() * (200 - 10)) + 10,    1
      ],
      [
          1,    0,    0,    0,
          0,    1,    0,    0,
          0,    0,    1,    0,
          -1 * Math.floor(Math.random() * (100 - 0)),  Math.floor(Math.random() * (200 - 10)) + 10,  -1 * (Math.floor(Math.random() * (1500 - 700)) + 700),    1
      ]
    ]
    sides.forEach(element => {
      element.side.style.transform = matrixTransform.matrixArrayToCssMatrix(matrixTransform.multiplyArrayOfMatrices([
          matrixTransform.rotateAroundZAxis(Math.PI * element.Z),
          matrixTransform.rotateAroundXAxis(Math.PI * element.X),
          matrixTransform.rotateAroundYAxis(Math.PI * element.Y),
          matrixResults[Math.floor(Math.random() * (6 - 0))]
      ]));
    })
}
cubePower.connectSide = function(element, matrix, scaleSideX, scaleSideY, scaleSideZ, translateSideX, translateSideY, translateSideZ) {
  element.style.transform = matrixTransform.matrixArrayToCssMatrix(matrix)
    // let scaleX = scaleSideX - matrix[0],
    //     scaleY = scaleSideY - matrix[4],
    //     scaleZ = scaleSideZ - matrix[9],
    //     translateX = translateSideX - matrix[12],
    //     translateY = translateSideY - matrix[13],
    //     translateZ = translateSideZ - matrix[14];
    // console.log(scaleX, scaleY, scaleZ, translateX, translateY, translateZ);
}
cubePower.destroyCube()
// cubePower
