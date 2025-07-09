const LoadingPage = () => {
  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .loading-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          z-index: 9999;
          overflow: hidden;
        }

        .loading-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%);
          animation: backgroundMove 6s ease-in-out infinite;
        }

        @keyframes backgroundMove {
          0%, 100% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(-20px) translateY(-10px); }
          50% { transform: translateX(20px) translateY(10px); }
          75% { transform: translateX(-10px) translateY(20px); }
        }

        .loading-content {
          position: relative;
          z-index: 1;
          text-align: center;
          color: white;
        }

        .loading-logo {
          width: 120px;
          height: 120px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 40px;
          backdrop-filter: blur(20px);
          border: 2px solid rgba(255, 255, 255, 0.2);
          animation: logoFloat 3s ease-in-out infinite;
          position: relative;
          overflow: hidden;
        }

        .loading-logo::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          animation: shimmer 2s linear infinite;
        }

        .loading-logo-text {
          font-size: 48px;
          font-weight: 700;
          background: linear-gradient(45deg, #fff, #f0f0f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
          z-index: 1;
        }

        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }

        .loading-spinner {
          width: 80px;
          height: 80px;
          margin: 0 auto 30px;
          position: relative;
        }

        .spinner-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 4px solid transparent;
          border-radius: 50%;
          animation: spin 2s linear infinite;
        }

        .spinner-ring:nth-child(1) {
          border-top: 4px solid rgba(255, 255, 255, 0.8);
          animation-delay: 0s;
        }

        .spinner-ring:nth-child(2) {
          border-right: 4px solid rgba(255, 255, 255, 0.6);
          animation-delay: -0.5s;
          animation-duration: 1.5s;
        }

        .spinner-ring:nth-child(3) {
          border-bottom: 4px solid rgba(255, 255, 255, 0.4);
          animation-delay: -1s;
          animation-duration: 1s;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loading-title {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 16px;
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          animation: textPulse 2s ease-in-out infinite;
        }

        .loading-subtitle {
          font-size: 18px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 40px;
          animation: textPulse 2s ease-in-out infinite 0.5s;
        }

        @keyframes textPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .loading-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 30px;
        }

        .dot {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          animation: dotBounce 1.4s ease-in-out infinite;
        }

        .dot:nth-child(1) { animation-delay: 0s; }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes dotBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-20px); }
        }

        .loading-progress {
          width: 300px;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          overflow: hidden;
          margin-top: 40px;
          position: relative;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.8));
          border-radius: 2px;
          animation: progressMove 2s ease-in-out infinite;
          width: 50%;
        }

        @keyframes progressMove {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }

        .loading-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: particleFloat 8s linear infinite;
        }

        .particle:nth-child(1) { left: 10%; animation-delay: 0s; }
        .particle:nth-child(2) { left: 20%; animation-delay: 1s; }
        .particle:nth-child(3) { left: 30%; animation-delay: 2s; }
        .particle:nth-child(4) { left: 40%; animation-delay: 3s; }
        .particle:nth-child(5) { left: 50%; animation-delay: 4s; }
        .particle:nth-child(6) { left: 60%; animation-delay: 5s; }
        .particle:nth-child(7) { left: 70%; animation-delay: 6s; }
        .particle:nth-child(8) { left: 80%; animation-delay: 7s; }
        .particle:nth-child(9) { left: 90%; animation-delay: 8s; }

        @keyframes particleFloat {
          0% { 
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        .loading-tip {
          position: absolute;
          bottom: 50px;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          font-weight: 500;
          animation: tipFade 3s ease-in-out infinite;
        }

        @keyframes tipFade {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        @media (max-width: 768px) {
          .loading-logo {
            width: 100px;
            height: 100px;
            margin-bottom: 30px;
          }
          
          .loading-logo-text {
            font-size: 40px;
          }
          
          .loading-title {
            font-size: 28px;
          }
          
          .loading-subtitle {
            font-size: 16px;
          }
          
          .loading-progress {
            width: 250px;
          }
          
          .loading-spinner {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>

      <div className="loading-container">
        <div className="loading-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>

        <div className="loading-content">
          <div className="loading-logo">
            <div className="loading-logo-text">L</div>
          </div>

          <div className="loading-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>

          <h1 className="loading-title">Loading...</h1>
          <p className="loading-subtitle">Please wait while we prepare everything for you</p>

          <div className="loading-progress">
            <div className="progress-bar"></div>
          </div>

          <div className="loading-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>

        <div className="loading-tip">
          💡 Tip: This usually takes just a few seconds
        </div>
      </div>
    </>
  );
};

export default LoadingPage;