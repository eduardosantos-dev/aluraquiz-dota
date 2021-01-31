/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../screens/Quiz';

export default function QuizDaGaleraPage({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen externalQuestions={dbExterno.questions} externalBg={dbExterno.bg} />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');
  try {
    const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error('Falha ao obter os dados');
      })
      .then((respostaConvertidaEmObjeto) => respostaConvertidaEmObjeto);

    return {
      props: {
        dbExterno,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}
