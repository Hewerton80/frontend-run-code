import { IProblem } from "@/modules/problem/problemTypes";
import { envConfig } from "@/utils/envConfig";
import { dalay } from "@/utils/dalay";
import { redirect } from "next/navigation";

export const ProblemService = {
  getById: async (id: string) => {
    const response = await fetch(`${envConfig.BASE_API_URL}/problem/${id}`, {
      cache: "force-cache",
    });
    if (response.status === 404) redirect("/404");
    const problem: IProblem = await response.json();
    if (!problem) redirect("/404");
    return problem;
  },
  getFromlistById: async ({
    problemId,
    classroomId,
    listId,
  }: {
    problemId: string;
    listId: string;
    classroomId: string;
  }) => {
    // const response = await fetch(
    //   `${envConfig.BASE_API_URL}/${classroomId}/list/${listId}/problem/${problemId}/classroom`,
    //   {
    //     cache: "force-cache",
    //   }
    // );
    // if (response.status === 404) redirect("/404");
    // const problem: IProblem = await response.json();
    // if (!problem) redirect("/404");
    // return problem;
    await dalay(3000);
    return {
      id: "7",
      title: "Triângulo de Pascal",
      description: `
          <div>
            <p>O triângulo de Pascal (alguns países, nomeadamente em França, é conhecido como Triângulo de Tartaglia) é um triângulo numérico infinito formado por números binomiais, onde <strong>n</strong> representa o número da linha e <strong>k</strong> representa o número da coluna, iniciando a contagem a partir do zero. O triângulo foi descoberto pelo matemático chinês Yang Hui, e 500 anos depois várias de suas propriedades foram estudadas pelo francês Blaise Pascal. Cada número do triângulo de Pascal é igual à soma do número imediatamente acima e do antecessor do número de cima.</p>
  
            <p style="text-align: center"><img alt="Triangulo de Pascal" src="https://static.todamateria.com.br/upload/tr/ia/triangulopascal4.jpg" style="height: 204px; width: 491px"></p>
  
            <p>
                David, o fera do seu time de programação competitiva, descobriu que a soma da i-ésima linha de um triângulo de pascal é <strong>2<sup>i</sup></strong>. Ele quer agora descobrir a soma do triângulo inteiro, de N linhas. Mas como ele achou que este problema era muito trivial para merecer a atenção dele, ele decidiu tentar resolver um problema sobre grafos bipartidos (um tópico muito mais difícil) e assim, sobrou para você encontrar a solução deste problema.
            </p>
          </div></br>
  
          <h2 style="font-size: 20px; font-weight: bold">Entrada</h2>
  
   
              <p>A primeira linha da entrada contém um inteiro <strong>T</strong>, o número de casos de teste. As próximas <strong>T</strong> linhas contêm um inteiro <strong>N</strong> (1 ≤ <strong>N</strong> ≤ 31), o número de linhas do Triângulo de Pascal.</p>
          </br>
  
          <h2 style="font-size: 20px; font-weight: bold">Saída</h2>
  
  
          <p>Para cada caso de teste, a saída deve conter uma linha com um inteiro <strong>S</strong>, a soma do triângulo de pascal de <strong>N</strong> linhas.</p>
         
      `,
      tests: [
        {
          id: "1",
          inputs: ["4", "1", "2", "5", "31"],
          // para quebra de linha adicione um \n
          expectedOutput: "1\n3\n31\n2147483647",
        },
        {
          id: "2",
          inputs: ["3", "3", "4", "5"],
          expectedOutput: "7\n15\n31",
        },
        {
          id: "3",
          inputs: ["2", "6", "7"],
          expectedOutput: "63\n127",
        },
      ],
      difficulty: "Hard",
    } as IProblem;
  },
};
