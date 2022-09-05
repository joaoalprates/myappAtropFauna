import { HomePage } from './../home/home.page';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonContent, IonSlides, NavController } from '@ionic/angular';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import { AtropService } from './../services/api.service';

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
  public atropelamento: any;
  public atropelamentoLista = [];

  constructor(
    private actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    private sanitizer: DomSanitizer,
    private router: Router,
    private zone: NgZone,
    private atropService: AtropService,
    ) {
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

  get dadosLocalRodovia(): AbstractControl {
    return this.dadosLocalForm.get('rodovia');
  }

  get dadosLocalSentido(): AbstractControl {
    return this.dadosLocalForm.get('sentido');
  }

  get dadosLocalLado(): AbstractControl {
    return this.dadosLocalForm.get('lado');
  }

  get dadosLocalAlimentoPista(): AbstractControl {
    return this.dadosLocalForm.get('alimentoPista');
  }

  setupForm() {
    this.fotosForm = new FormGroup({

    });
    this.dadosAnimalForm = new FormGroup({
      especie: new FormControl('', Validators.required),
      sexo: new FormControl(1),
      estadoDecomposicao: new FormControl(1),
    });
    this.dadosLocalForm = new FormGroup({
      rodovia: new FormControl('', Validators.required),
      sentido: new FormControl('', Validators.required),
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

  onSaved() {

    this.dadosLocalFormRef.onSubmit(undefined);

    if (this.dadosLocalForm.valid) {
      this.atropelamento = {
        especie: this.dadosAnimalForm.get('especie').value,
        sexo: this.dadosAnimalForm.get('sexo').value,
        estadoDecomposicao: this.dadosAnimalForm.get('estadoDecomposicao').value,
        rodovia: this.dadosLocalForm.get('rodovia').value,
        sentido: this.dadosLocalForm.get('sentido').value,
        lado: this.dadosLocalForm.get('lado').value,
        alimentoPista: this.dadosLocalForm.get('alimentoPista').value,
      };

      this.atropService.createAtrop(this.atropelamento)
      .subscribe((response) => {
        this.zone.run(() => {
          this.setupForm();
          this.buildSlides();
          this.router.navigate(['\home']);
        });
      });
    }
  }

  onNextButtonTouched() {

    if (this.currentSlide === 'Fotos') {

      this.fotosFormRef.onSubmit(undefined);

      this.ionSlides.slideNext();
      this.ionContent.scrollToTop();

    } else if (this.currentSlide === 'Dados animal') {

      this.dadosAnimalFormRef.onSubmit(undefined);
      if (this.dadosAnimalForm.valid) {
        this.ionSlides.slideNext();
        this.ionContent.scrollToTop();
      }
    } else if (this.currentSlide === 'Dados local') {

    }  else {
      this.ionSlides.slideNext();
      this.ionContent.scrollToTop();
    }
  }

}
