'use client'
// pages/quiz.js
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import atriz from '@/public/image-atriz.png'
import { track } from '@vercel/analytics';

// Dados do Quiz
const questions = [
  {
    question: "Qual é o seu maior objetivo no momento?",
    options: [
      "Emagrecer rápido",
      "Ganhar massa muscular",
      "Ter mais energia no dia a dia",
      "Melhorar minha alimentação",
      "Manter um estilo de vida saudável",
    ],
    fruit: "🍎", // Maçã
  },
  {
    question: "Como você descreveria sua rotina atual?",
    options: [
      "Correria total, mal tenho tempo para cozinhar",
      "Treino pesado, mas minha dieta não acompanha",
      "Quero começar a me cuidar, mas não sei por onde",
      "Já me alimento bem, mas quero otimizar",
      "Preciso de uma mudança radical",
    ],
    fruit: "🍌", // Banana
  },
  {
    question: "Qual é o seu maior desafio na cozinha?",
    options: [
      "Falta de tempo para preparar refeições",
      "Não sei cozinhar coisas saudáveis",
      "Não tenho criatividade para variar os pratos",
      "Acho que comida saudável não é saborosa",
      "Não consigo manter a consistência",
    ],
    fruit: "🍇", // Uva
  },
  {
    question: "Se uma atriz famosa te oferecesse o segredo que a fez emagrecer rápido, o que você faria?",
    options: [
      "Aceitaria na hora e começaria hoje mesmo!",
      "Pediria dicas extras para ganhar músculos também",
      "Compartilharia com meus amigos para fazermos juntos",
      "Aprenderia a adaptar as receitas para o meu dia a dia",
      "Agradeceria, mas seguiria meu próprio caminho",
    ],
    fruit: "🍓", // Morango
  },
  {
    question: "Qual é o seu lanche preferido?",
    options: [
      "Frutas com iogurte",
      "Ovos cozidos",
      "Barrinhas de proteína",
      "Pão integral com queijo",
      "Algo crocante e salgado",
    ],
    fruit: "🍊", // Laranja
  },
  {
    question: "O que você mais gostaria de mudar na sua alimentação?",
    options: [
      "Comer menos besteiras",
      "Aprender a fazer refeições rápidas",
      "Incluir mais proteínas na dieta",
      "Ter mais variedade no cardápio",
      "Comer de forma mais equilibrada",
    ],
    fruit: "🍍", // Abacaxi
  },
  {
    question: "Qual é o seu nível de experiência na cozinha?",
    options: [
      "Zero, preciso de receitas super simples",
      "Básico, sei fazer o arroz e feijão",
      "Intermediário, gosto de experimentar coisas novas",
      "Avançado, mas quero ideias novas",
      "Sou um chef amador!",
    ],
    fruit: "🥑", // Abacate
  },
  {
    question: "Qual dessas frases te define melhor?",
    options: [
      "Quero resultados rápidos!",
      "Foco nos ganhos musculares!",
      "Preciso de mais energia para o dia a dia!",
      "Quero me alimentar melhor sem complicação!",
      "Busco um estilo de vida mais saudável!",
    ],
    fruit: "🍉", // Melancia
  },
  {
    question: "Qual é o seu maior sonho fitness?",
    options: [
      "Perder 10 kg em 2 meses",
      "Ganhar músculos definidos",
      "Ter disposição para malhar e trabalhar",
      "Aprender a cozinhar de forma saudável",
      "Manter um corpo saudável a longo prazo",
    ],
    fruit: "🍑", // Pêssego
  },
  {
    question: "O que você faria se descobrisse um método simples para emagrecer e ganhar músculos?",
    options: [
      "Começaria hoje mesmo!",
      "Compartilharia com meus amigos",
      "Usaria para melhorar minha rotina",
      "Aproveitaria para aprender mais",
      "Transformaria minha vida completamente",
    ],
    fruit: "🍒", // Cereja
  },
];

// Estilos com styled-components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #ff9a9e, #fad0c4);
  padding: 20px;
  font-family: "Arial", sans-serif;
`;

const ProgressBar = styled.div`
  width: 80%;
  height: 10px;
  background: #e0e0e0;
  border-radius: 10px;
  margin-bottom: 20px;
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: #4caf50;
  border-radius: 10px;
`;

const QuestionCard = styled(motion.div)`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  width: 100%;
`;

const OptionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border: none;
  border-radius: 10px;
  background: ${(props) => props.color};
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const FruitIcon = styled.span`
  font-size: 24px;
  margin-right: 10px;
`;

const ResultScreen = styled.div`
  text-align: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
`;

const CTAButton = styled(motion.button)`
  background: #ff6f61;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background: #ff3b2f;
  }
`;

const CalculatingScreen = styled.div`
  text-align: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
`;

const Spinner = styled(motion.div)`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #ff6f61;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const HistoryScreen = styled.div`
  text-align: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
`;

const ActressImage = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
  margin: 20px auto;
`;

const HistoryText = styled.p`
  text-align: left;
  font-size: 16px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 20px;
`;

// Componente da Página
export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const linkCheckout = 'https://pay.kiwify.com.br/oBJUYz5'

  const handleAnswer = () => {
    track('option: ' + currentQuestion);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setProgress(progress + 10);
    } else {
      setProgress(100);
      setIsCalculating(true); // Mostra a tela de "Calculando respostas"
      setTimeout(() => {
        setIsCalculating(false); // Esconde a tela de "Calculando respostas"
        setShowResult(true); // Mostra o resultado final
      }, 6000); // 3 segundos de delay
    }
  };

  useEffect(() => {
    const els = document.getElementsByClassName("option-item");

    const handleMouseEnter = (event: any) => {
      const span = event.currentTarget.querySelector("span");
      if (span) {
        span.classList.add("animate-spin");
      }
    };

    const handleMouseLeave = (event: any) => {
      const span = event.currentTarget.querySelector("span");
      if (span) {
        span.classList.remove("animate-spin");
      }
    };

    Array.from(els).forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // Limpeza dos event listeners
    return () => {
      Array.from(els).forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []); // Executa apenas uma vez após o primeiro render

  return (
    <Container>
      <ProgressBar>
        <ProgressFill
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </ProgressBar>

      {!showResult && !isCalculating ? (
        <QuestionCard
          className="shadow-xl relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="absolute -top-3 -right-3 text-2xl hover:animate-bounce ">
            🦋
          </span>
          <h2 className="text-zinc-800 text-center text-xl font-bold">{questions[currentQuestion].question}</h2>
          {questions[currentQuestion].options.map((option, index) => (
            <OptionButton
              key={index}
              color={index % 2 === 0 ? "#ff6f61" : "#4caf50"}
              onClick={handleAnswer}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`option-item`}
            >
              <FruitIcon>{questions[currentQuestion].fruit}</FruitIcon>
              {option}
            </OptionButton>
          ))}
        </QuestionCard>
      ) : isCalculating ? (
        <CalculatingScreen className="relative">
          <span className="absolute -top-3 -right-3 text-2xl">
          💗
          </span>
          <Spinner />
          <h2 className="text-zinc-800 text-center text-xl font-bold mt-4">Calculando suas respostas...</h2>
          <p className="text-zinc-600">Estamos analisando suas respostas para personalizar o ebook perfeito para você!</p>
        </CalculatingScreen>
      ) : showHistory ? (
        <HistoryScreen className="relative">
          <span className="absolute -top-3 -right-3 text-4xl">
            🦋
          </span>
          <SobreEBook linkCheckout={linkCheckout} setShowHistory={setShowHistory} />
        </HistoryScreen>
      ) : (
        <ResultScreen className="relative">
          <span className="absolute -top-3 -right-3 text-4xl">
          🌸
          </span>
          <div className="text-zinc-600 relative">
            <h2 className="text-3xl">Parabéns! Você completou o quiz! 🎉</h2>
            <p>
              Com base nas suas respostas, o nosso ebook (livro digital) foi feito especialmente para você! Descubra o segredo das celebridades para <b>emagrecer rápido e ganhar músculos</b> com o nosso ebook exclusivo!
            </p>
            <br />
            <p className="font-bold underline">
              <motion.span className=" pr-2 text-2xl inline-block"
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} // Loop infinito
              >👉 </motion.span>
              60 Receitas Proteicas: Aumente Sua Energia e Ganhe Músculos!
            </p>
            <CTAButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                track('Visit', { productName: 'ebook checkout visit do showresult', price: 14.99 });
                (window.location.href = linkCheckout)
              }}
            >
              Quero meu ebook agora!
            </CTAButton>
            <CTAButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowHistory(true)}
              style={{ backgroundColor: "#4caf50", marginTop: "10px" }}
            >
              Como surgiu esse ebook?
            </CTAButton>
          </div>
        </ResultScreen>
      )}
    </Container>
  );
}

type TSobre = {
  linkCheckout: string;
  setShowHistory: Function;
}

const SobreEBook = (props: TSobre) => {
  const { linkCheckout, setShowHistory } = props

  return (
    <div>
      <h2 className="text-zinc-800 text-center text-xl font-bold">Como surgiu esse ebook?</h2>
      <ActressImage src={atriz.src} alt="Atriz de Hollywood" />
      <HistoryText>

        O e-book que revolucionou a vida de uma das maiores atrizes de Hollywood agora está ao seu alcance! Em apenas um mês, ela alcançou uma incrível transformação física para um papel no cinema, e o segredo estava em um exclusivo livro digital com 60 receitas práticas, acessíveis e poderosas.
      </HistoryText>
      <HistoryText>
        Originalmente vendido por <b>USD 100,00 (quase R$ 600,00)</b>, a Astro Fitness trouxe esse conteúdo para o Brasil, traduzido e adaptado, por um <b>preço 40 vezes mais acessível!</b> 
      </HistoryText>
      <HistoryText>
        Agora, você também pode ter acesso a essas receitas testadas e aprovadas, que combinam nutrição balanceada, custo baixo e preparo rápido. Seja para emagrecer, ganhar músculos ou ter mais energia, este e-book é o seu guia para uma vida saudável sem complicações.
      </HistoryText>
      <h3 className="font-bold py-3 text-zinc-800">Por que esperar?</h3>
      <ul className="text-zinc-800 space-y-3 list-disc list-inside">
        <li className="flex items-start">
          <span className="mr-2">✔️</span>
          Receitas fáceis de seguir, mesmo para iniciantes.
        </li>
        <li className="flex items-start">
          <span className="mr-2">✔️</span>
          Ingredientes acessíveis que cabem no seu bolso.
        </li>
        <li className="flex items-start">
          <span className="mr-2">✔️</span>
          Resultados comprovados, inspirados em uma trajetória de sucesso.
        </li>
      </ul>
      <br /><br />
      <HistoryText>
      Não perca a chance de transformar sua alimentação e sua vida.
      </HistoryText>
      <CTAButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          track('Visit', { productName: 'ebook checkout visit do mais sobre o ebook', price: 14.99 });
          (window.location.href = linkCheckout)
        }}
      >
        Quero meu ebook agora!
      </CTAButton>
      <CTAButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowHistory(false)}
        style={{ backgroundColor: "#4caf50", marginTop: "10px" }}
      >
        Voltar para o resultado
      </CTAButton>
    </div>
  )
}