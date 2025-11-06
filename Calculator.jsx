import { useState } from 'react';

const ops = [
  { value: 'add', label: 'Suma (+)' },
  { value: 'sub', label: 'Resta (-)' },
  { value: 'mul', label: 'Multiplicación (×)' },
  { value: 'div', label: 'División (÷)' },
];

export default function Calculator() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [op, setOp] = useState('add');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const parse = (x) => {
    const n = Number(x);
    return Number.isFinite(n) ? n : null;
  };

  const calculate = () => {
    setError('');
    setResult(null);

    const n1 = parse(a);
    const n2 = parse(b);

    if (n1 === null || n2 === null) {
      setError('Ingrese números válidos.');
      return;
    }
    if (op === 'div' && n2 === 0) {
      setError('No se puede dividir por cero.');
      return;
    }

    let r;
    switch (op) {
      case 'add': r = n1 + n2; break;
      case 'sub': r = n1 - n2; break;
      case 'mul': r = n1 * n2; break;
      case 'div': r = n1 / n2; break;
      default: r = null;
    }
    setResult(r);
  };

  const reset = () => { setA(''); setB(''); setOp('add'); setResult(null); setError(''); };

  return (
    <div style={styles.card}>
      <h1>Calculadora</h1>

      <div style={styles.row}>
        <input
          aria-label="primer-numero"
          type="text"
          placeholder="Número A"
          value={a}
          onChange={(e) => setA(e.target.value)}
          style={styles.input}
        />
        <select
          aria-label="operacion"
          value={op}
          onChange={(e) => setOp(e.target.value)}
          style={styles.select}
        >
          {ops.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <input
          aria-label="segundo-numero"
          type="text"
          placeholder="Número B"
          value={b}
          onChange={(e) => setB(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.row}>
        <button onClick={calculate} style={styles.button}>Calcular</button>
        <button onClick={reset} style={{...styles.button, background:'#555'}}>Limpiar</button>
      </div>

      {error && <p role="alert" style={{ color: '#ff6b6b' }}>{error}</p>}
      {result !== null && !error && <p>Resultado: <strong>{result}</strong></p>}
    </div>
  );
}

const styles = {
  card: { maxWidth: 520, margin: '40px auto', background:'#1f2937', color:'#fff', padding:24, borderRadius:16, boxShadow:'0 10px 25px rgba(0,0,0,.25)', textAlign:'center' },
  row: { display:'flex', gap:12, justifyContent:'center', alignItems:'center', margin:'12px 0' },
  input: { padding:10, borderRadius:8, border:'1px solid #374151', background:'#111827', color:'#fff', width:140 },
  select:{ padding:10, borderRadius:8, border:'1px solid #374151', background:'#111827', color:'#fff' },
  button:{ padding:'10px 16px', border:'none', borderRadius:8, background:'#2563eb', color:'#fff', cursor:'pointer' }
};
