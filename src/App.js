import {useRef,useEffect} from 'react';
import html2canvas from 'html2canvas';
import Chart from 'chart.js/auto';
import moment from 'moment';
import { jsPDF } from "jspdf";
import './App.scss';
import 'moment/locale/es';

Chart.defaults.font.color = 'black';
const coloresGraficas = [
  "#458EED",//azulYope
  "#FAB34D",//naranjaYope
];
function App() {
  const chartRef = useRef();
  useEffect(()=>{
    hagoGrafica()
  },[])
  const hagoGrafica =()=>{

    const data = {
      labels: [
      'Red',
      'Blue', 
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [22918, 1071],
        backgroundColor:coloresGraficas,
        borderColor:coloresGraficas,
      }]
    };
    const config = {
      type: 'pie',
      data: data,
      options:{
        plugins:{
          title:{
            display:false,
            text:'Avance general del proyecto',
            font:{
              size:'40px',
              style:'bold',
              color:'#000'
            }
          },
          legend: {
            display: false,
            labels:{
            }
          },
          tooltip:{
            enabled:false
          }
        }
      }
    };

    const miGrafica = new Chart(chartRef.current.getContext('2d'), config );
  }
  const generaPDF =async()=>{
    const docPDFGeneradoUwU = new jsPDF({orientation: 'landscape',format: 'letter'});
    let renderizado = document.getElementById("idElemento") ;
    let imagen = await html2canvas(renderizado ,{logging:false,scale:1}).then(function(canvas) {
      return canvas.toDataURL();
    });

    let pageWidth = 279, 
    pageHeight = 216,
    centradoY = (pageHeight/2),
    margin = 10,
    maxLineWidth = pageWidth - margin * 2;
    docPDFGeneradoUwU.addImage(imagen, "JPEG",margin, margin, 260, 195);
    docPDFGeneradoUwU.setFont("helvetica","bold").setFontSize(12).text(moment().format('dddd DD MMMM YYYY') , maxLineWidth - 50  , pageHeight - 5 )
    
    docPDFGeneradoUwU.save("reporte_avance.pdf")
  }
  return (
    <div className="pdfContainer">
    <button onClick={generaPDF} >
      Meow
    </button>
      <div id="idElemento" className="container"  >
        <div className="card-respuestas ">
          <div className="titulo-pregunta" >
            <h1>Avance general del proyecto</h1>
          </div>
          <div className="chart-container" >
            <canvas className={"chart-rendered pie"} ref={chartRef} />
            <div className="info-column" >
              <div className="info-container"  >
                <div className="cuadro-color"  style={{backgroundColor:'transparent'}} />
                <div className="data"  >
                  <div className="opcion" >Meta Gral.</div>
                  <div className="cantidad-total"  >23,989</div>
                </div>
              </div>
              <div className="info-container"  >
                <div className="cuadro-color"  style={{backgroundColor:coloresGraficas[0]}} />
                <div className="data"  >
                  <div className="opcion" >Avance</div>
                  <div className="cantidad-perc"  >4.46%</div>
                  <div className="cantidad-total"  >1,071</div>
                </div>
              </div>
              <div className="info-container"  >
                <div className="cuadro-color"  style={{backgroundColor:coloresGraficas[1]}} />
                <div className="data"  >
                  <div className="opcion" >Meta actual</div>
                  <div className="cantidad-perc"  >95.55%</div>
                  <div className="cantidad-total"  >22,918</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
