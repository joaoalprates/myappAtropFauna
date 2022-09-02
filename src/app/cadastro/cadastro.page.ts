import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonContent, IonSlides, NavController } from '@ionic/angular';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  @ViewChild(IonContent, { static: true }) ionContent: IonContent;
  @ViewChild(IonSlides, { static: false }) ionSlides: IonSlides;
  @ViewChild('fotosFormRef', { static: false }) fotosFormRef: NgForm;
  @ViewChild('dadosAnimalFormRef', { static: false }) dadosAnimalFormRef: NgForm;
  @ViewChild('dadosLocalFormRef', { static: false }) dadosLocalFormRef: NgForm;

  public fotosForm: FormGroup;
  public dadosAnimalForm: FormGroup;
  public dadosLocalForm: FormGroup;

  public slidesOpts = {
    allowTouchMove: false,
    autoHeight: true,
  };

  public slides: string[];
  public currentSlide: string;
  public isBeginning = true;
  public isEnd = false;

  public sexos = [];
  public estadosDecomposicao = [];
  public lados = [];
  public alimentosPista = [];

  constructor(private actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController,
    private sanitizer: DomSanitizer) {
  }

  get dadosAnimalEspecie(): AbstractControl {
    return this.dadosAnimalForm.get('especie');
  }

  get dadosAnimalSexo(): AbstractControl {
    return this.dadosAnimalForm.get('sexo');
  }

  get dadosAnimalEstadoDecomposicao(): AbstractControl {
    return this.dadosAnimalForm.get('estadoDecomposicao');
  }

  get dadosAnimalRodovia(): AbstractControl {
    return this.dadosAnimalForm.get('rodovia');
  }

  get dadosAnimalSentido(): AbstractControl {
    return this.dadosAnimalForm.get('sentido');
  }

  get dadosAnimalLado(): AbstractControl {
    return this.dadosAnimalForm.get('lado');
  }

  get dadosAnimalAlimentoPista(): AbstractControl {
    return this.dadosAnimalForm.get('alimentoPista');
  }

  setupForm() {
    this.fotosForm = new FormGroup({

    });
    this.dadosAnimalForm = new FormGroup({
      especie: new FormControl(''),
      sexo: new FormControl(1),
      estadoDecomposicao: new FormControl(1),
    });
    this.dadosLocalForm = new FormGroup({
      rodovia: new FormControl(''),
      sentido: new FormControl(''),
      lado: new FormControl(1),
      alimentoPista: new FormControl(1),
    });
  }

  ionViewDidEnter() {
    this.ionSlides.updateAutoHeight();
  }

  buildSlides() {
    const slides = ['Fotos', 'Dados animal', 'Dados local'];
    this.currentSlide = slides[0];
    this.slides = slides;
  }

  async onSlidesChanged() {
    const index = await this.ionSlides.getActiveIndex();
    this.currentSlide = this.slides[index];
    this.isBeginning = await this.ionSlides.isBeginning();
    this.isEnd = await this.ionSlides.isEnd();
  }

  onSlidesDidChange() {
    this.ionContent.scrollToTop();
  }

  onBackButtonTouched() {
    this.ionSlides.slidePrev();
    this.ionContent.scrollToTop();
  }

  ngOnInit() {
    this.setupForm();
    this.buildSlides();

    this.sexos = [
      { value: 1, text: 'Macho' },
      { value: 2, text: 'Fêmea' },
    ];

    this.estadosDecomposicao = [
      { value: 1, text: 'Avançado' },
      { value: 2, text: 'Médio' },
      { value: 3, text: 'Recente' },
    ];

    this.lados = [
      { value: 1, text: 'Direito' },
      { value: 2, text: 'Esquerdo' },
    ];

    this.alimentosPista = [
      { value: 1, text: 'Sim' },
      { value: 2, text: 'Não' },
    ];
  }

  onNextButtonTouched() {

    console.log(this.currentSlide);
    if (this.currentSlide === 'Fotos') {

      this.fotosFormRef.onSubmit(undefined);

        this.ionSlides.slideNext();
        this.ionContent.scrollToTop();

    } else if (this.currentSlide === 'Dados animal') {

      this.dadosAnimalFormRef.onSubmit(undefined);

        this.ionSlides.slideNext();
        this.ionContent.scrollToTop();

    } else if (this.currentSlide === 'Dados local') {

      this.dadosLocalFormRef.onSubmit(undefined);

      if (this.dadosLocalForm.valid) {
        this.navCtrl.navigateRoot('/thanks', {
          animated: true,
          animationDirection: 'forward',
        });
      }

    }  else {

      this.ionSlides.slideNext();
      this.ionContent.scrollToTop();
    }
  }

}
