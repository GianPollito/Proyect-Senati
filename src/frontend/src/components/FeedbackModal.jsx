  import { useState } from 'react';

  function FeedbackModal({ isOpen, onClose }) {
    const [feedbackText, setFeedbackText] = useState('');
    const [includeSystemInfo, setIncludeSystemInfo] = useState(true);

    if (!isOpen) return null;

    const handleSubmit = () => {
      console.log('Comentario enviado:', feedbackText);
      console.log('Incluir información del sistema:', includeSystemInfo);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 md:p-8 z-50">
        <div className="relative bg-[#F5F5F5] rounded-xl shadow-2xl w-full max-w-md">
          
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-black font-bold">Envíanos tus comentarios</h2>
            <p className="text-gray-500 mt-1">Describe el problema de forma detallada</p>
          </div>

          <div className="p-4">
            <p className="text-gray-500 mb-3 text-sm">
              ¿Quieres enviarnos comentarios? Nos encantaría que lo hicieras, pero no
              compartas información sensible. ¿Tienes alguna pregunta? Visita el Centro de
              ayúda o comunícate con el servicio de asistencia.
            </p>
            <textarea
              className="w-full h-28 bg-[#F5F5F5] text-gray-400 p-3 rounded-lg border border-red-600 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none resize-none"
              placeholder="Describe el problema aquí..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            ></textarea>
            
            <p className="text-gray-500 mt-4 text-xs">
              Es posible que se envíe a Google información de la cuenta y el sistema, como los controladores de
              dispositivos y programas instalados. Usaremos la información que nos proporcione para solucionar
              problemas técnicos y mejorar nuestros servicios, sujeto a nuestra <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">Política de Privacidad</a> y nuestras <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">Condiciones del Servicio</a>. Para solicitar cambios de contenido por motivos legales, visite la <a href="https://support.google.com/legal/answer/3110420" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">página de ayuda legal</a>.
            </p>

            <label className="flex items-center mt-4 text-sm cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 accent-red-600 bg-gray-700 border-gray-500 rounded focus:ring-red-500"
                checked={includeSystemInfo}
                onChange={() => setIncludeSystemInfo(!includeSystemInfo)}
              />
              <span className="ml-2 text-gray-500">Enviar información del sistema</span>
            </label>
          </div>

          <div className="p-4 border-t border-gray-700 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-5 py-1.5 rounded-lg text-black hover:bg-gray-300 transition duration-150"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition duration-150"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    );
  }

  export default FeedbackModal;