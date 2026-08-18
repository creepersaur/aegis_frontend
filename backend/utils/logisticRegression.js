const scalerParams = { "mean": [0.571254500977403, 0.4782215611536343, 10.075371171740677, 0.019698969386659656, 0.019480642826621937, 0.020123306585414766, 12.52001822635457, 10.200144273202437, 0.08574260301043649], "scale": [1.1308369487637475, 1.1277571353889642, 1.0527783836052234, 0.04971329575020815, 0.050219805245416416, 0.04986825121280125, 5.8293901241812645, 1.297751635226959, 0.03606912015864164] };
const weights = [1.40935280e+00, 1.42905725e+00, 1.66157063e+00, 9.24896337e-02, 4.95119406e-03, -1.95486644e-02, -8.53313870e-01, 1.73568586e+00, 5.89014187e-04];
const bias = -6.97985147;

const transform = (X) => {
    const X_scaled = [];

    for (let i = 0; i < X.length; i++) {
        X_scaled.push(
            (X[i] - scalerParams["mean"][i]) / scalerParams["scale"][i]
        );
    }

    return X_scaled;
};

const sigmoid = (z) => {
    return (1 / (1 + Math.exp(-z)));
};

const predictProba = (X) => {
    const X_scaled = transform(X);
    let z = bias;

    for (let i = 0; i < X_scaled.length; i++) {
        z += weights[i] * X_scaled[i];
    }

    return sigmoid(z);
};

const predict = (X) => {
    return predictProba(X) > 0.5;
};

module.exports = { predict, predictProba, transform, sigmoid };
