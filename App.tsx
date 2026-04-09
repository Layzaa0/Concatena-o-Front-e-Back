import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Registro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [doc, setDoc] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");

  const salvar = async () => {
    try {
      const resposta = await axios.post("http://localhost:3001/registro", {
        nome,
        email,
        telefone,
        documento: doc,
        senha,
      });

      setMsg(resposta.data.retorno);

      setNome("");
      setEmail("");
      setTelefone("");
      setDoc("");
      setSenha("");
    } catch {
      setMsg("Falha no cadastro.");
    }
  };

  return (
    <div className="container d-flex vh-100 justify-content-center align-items-center">
      <div className="card p-4 shadow" style={{ width: 380 }}>
        <h3 className="text-center mb-3">Novo Registro</h3>

        <input className="form-control mb-2" placeholder="Nome"
          value={nome} onChange={(e) => setNome(e.target.value)} />

        <input className="form-control mb-2" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} />

        <input className="form-control mb-2" placeholder="Telefone"
          value={telefone} onChange={(e) => setTelefone(e.target.value)} />

        <input className="form-control mb-2" placeholder="Documento"
          value={doc} onChange={(e) => setDoc(e.target.value)} />

        <input type="password" className="form-control mb-3" placeholder="Senha"
          value={senha} onChange={(e) => setSenha(e.target.value)} />

        <button className="btn btn-success w-100" onClick={salvar}>
          Registrar
        </button>

        <p className="mt-3 text-center">{msg}</p>
      </div>
    </div>
  );
}