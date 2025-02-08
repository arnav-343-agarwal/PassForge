import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black p-4">
      <div className="w-full max-w-lg shadow-xl rounded-xl p-6 bg-gray-700 text-white">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-400">PassForge - Secure Password Generator</h1>
        <div className="space-y-4">
          <div className="flex border rounded-lg overflow-hidden bg-gray-600">
            <input
              type="text"
              value={password}
              className="w-full p-2 text-lg bg-gray-600 outline-none text-white"
              readOnly
              ref={passwordRef}
            />
            <button onClick={copyPasswordToClipboard} className="bg-green-500 hover:bg-green-600 px-4 py-2 text-white">Copy</button>
          </div>
          {copied && <p className="text-green-400 text-center">Copied to clipboard!</p>}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-lg">Length: {length}</label>
              <input
                type="range"
                min={6}
                max={32}
                value={length}
                className="cursor-pointer"
                onChange={(e) => setLength(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={numberAllowed}
                  onChange={() => setNumberAllowed((prev) => !prev)}
                  className="accent-green-500"
                />
                <span>Include Numbers</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={charAllowed}
                  onChange={() => setCharAllowed((prev) => !prev)}
                  className="accent-green-500"
                />
                <span>Include Symbols</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;