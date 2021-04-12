import { Component, OnInit, ViewChild, ChangeDetectorRef ,NgZone} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';

import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { ApisService } from 'src/app/services/apis.service';
import { environment } from 'src/environments/environment';
import { UtilService } from 'src/app/services/util.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

declare var google: any;
@Component({
  selector: 'app-manage-stores',
  templateUrl: './manage-stores.component.html',
  styleUrls: ['./manage-stores.component.scss']
})
export class ManageStoresComponent implements OnInit {
  @ViewChild('placesRef', { static: false }) placesRef: GooglePlaceDirective;

  banner_to_upload: any = '';
  id: any;
  new: boolean;
  address: any = '';
  latitude: any;
  longitude: any;
  
  coverImage: any;
  gender: any = 1;

  name: any = '';
  descritions: any = '';
  haveData: boolean = false;
  time: any = '';
  commission: any;
  email: any = '';
  openTime;
  closeTime;
  fname: any = '';
  lname: any = '';
  password: any = '';
  phone: any = '';
  city: any = '';
  totalSales: any = 0;
  totalOrders: any = 0;
  reviews: any[] = [];
  cities: any[] = [];
  fileURL: any;
  orders: any[] = [];
  Days: any[] = [];

  monday;
  monday_open_time;
  monday_close_time;

  tuesday;
  tuesday_close_time;
  tuesday_open_time;

  wednesday
  wednesday_close_time
  wednesday_open_time

  thursday_open_time
  thursday_close_time
  thursday

  friday_open_time
  friday_close_time
  friday

  saturday_open_time
  saturday_close_time
  saturday

  sunday_open_time
  sunday_close_time
  sunday


  constructor(
    private route: ActivatedRoute,
    public api: ApisService,
    private toastyService: ToastyService,
    private spinner: NgxSpinnerService,
    private navCtrl: Location,
    private chMod: ChangeDetectorRef,
    public util: UtilService,
    private ngZone: NgZone
  ) {
    this.getCity();

  }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      console.log('data=>', data);
      this.new = data.register === 'true' ? true : false;
      console.log(this.new);
      if (data && data.id && data.register) {
        this.id = data.id;
        this.getVenue();
        this.getReviews();
      }
    });



  }

  getOrders() {


    const param = {
      id: this.id
    };

    this.api.post('orders/getByStore', param).then((data: any) => {
      console.log('by store id', data);
      let total = 0;
      if (data && data.status === 200 && data.data.length > 0) {
        data.data.forEach(async (element) => {
          if (((x) => { try { JSON.parse(x); return true; } catch (e) { return false } })(element.orders)) {
            element.orders = JSON.parse(element.orders);
            element.orders = await element.orders.filter(x => x.store_id === this.id);
            if (((x) => { try { JSON.parse(x); return true; } catch (e) { return false } })(element.status)) {
              const info = JSON.parse(element.status);
              await element.orders.forEach(calc => {
                if (calc.variations && calc.variations !== '' && typeof calc.variations === 'string') {
                  calc.variations = JSON.parse(calc.variations);
                  console.log(calc['variant']);
                  if (calc["variant"] === undefined) {
                    calc['variant'] = 0;
                  }
                }
                if (calc.sell_price === '0.00') {
                  total = total + parseFloat(calc.original_price);
                } else {
                  total = total + parseFloat(calc.sell_price);
                }
              });
              const selected = await info.filter(x => x.id === this.id);
              if (selected && selected.length) {
                const status = selected[0].status;
                element['storeStatus'] = status;
                this.orders.push(element);
              }
            }
          }
        });
        setTimeout(() => {
          function percentage(num, per) {
            return (num / 100) * per;
          }
          console.log(total, this.commission);
          const totalPrice = percentage(total, parseFloat(this.commission));
          console.log('commistion=====>>>>>', totalPrice.toFixed(2));
          this.totalSales = totalPrice.toFixed(2);
          // this.totalAmount = total;
          // this.toPay = this.commisionAmount;
        }, 1000);
      }
    }, error => {
      console.log(error);
      this.error('Something went wrong');
    }).catch(error => {
      console.log(error);
      this.error('Something went wrong');
    });
  }

  getReviews() {
    const param = {
      id: this.id,
      where: 'sid = ' + this.id
    };

    this.api.post('rating/getFromIDs', param).then((data: any) => {
      console.log(data);
      if (data && data.status === 200) {
        this.reviews = data.data;
      }
    }, error => {
      console.log(error);
      this.error('Something went wrong');
    }).catch(error => {
      console.log(error);
      this.error('Something went wrong');
    });
  }

  getVenue() {
    this.spinner.show();
    const param = {
      id: this.id
    };
    this.api.post('stores/getById', param).then((datas: any) => {
      console.log('================>',datas);
      this.spinner.hide();
      if (datas && datas.status === 200 && datas.data.length) {
        const info = datas.data[0];
        this.city = info.cid;
        this.name = info.name;
        this.address = info.address;
        this.latitude = info.lat;
        this.longitude = info.lng;
        this.fileURL = info.cover;
        this.coverImage = environment.mediaURL + info.cover;
        this.descritions = info.descriptions;
        this.openTime = info.open_time;
        this.closeTime = info.close_time;
        this.commission = info.commission;
      
        if(datas.exrtaData.days){

          this.Days = datas.exrtaData.days; 

          console.log('i am here =====>', this.Days )
          this.Days.forEach(element => {
            console.log('element========>',element)
              if(element.days === 'MONDAY'){
                this.monday = true;
                this.monday_open_time = element.open_time;
                this.monday_close_time = element.close_time;
              }
              if(element.days === 'TUESDAY'){
                this.tuesday = true;
                this.tuesday_close_time  = element.close_time;
                this.tuesday_open_time = element.open_time;

              }
              if(element.days === 'WEDNESDAY'){
                this.wednesday = true;
                this.wednesday_close_time  = element.close_time;
                this.wednesday_open_time = element.open_time;
              }
              if(element.days === 'THURSDAY'){
                this.thursday_open_time = element.open_time;
                this.thursday_close_time  = element.close_time;
                this.thursday = true;
              }
              if(element.days === 'FRIDAY'){
                this.friday_open_time = element.open_time;
                this.friday_close_time =  element.close_time;
                this.friday =  true;
              }
              if(element.days === 'SATURDAY'){
                
                this.saturday_open_time = element.open_time;
                this.saturday_close_time = element.close_time;
                this.saturday =  true;
              }
              if(element.days === 'SUNDAY'){
                this.sunday_open_time =  element.open_time;
                this.sunday_close_time = element.close_time;
                this.sunday =  true;
              }
          });

        }

        this.getOrders();
      } else {
        this.spinner.hide();
        this.error(this.api.translate('Something went wrong'));
      }
    }, error => {
      this.spinner.hide();
      console.log(error);
      this.error(this.api.translate('Something went wrong'));
    }).catch(error => {
      this.spinner.hide();
      console.log(error);
      this.error(this.api.translate('Something went wrong'));
    });
  }

  getImage(cover) {
    return cover ? cover : 'assets/icon.png';
  }
  getDate(date) {
    return moment(date).format('llll');
  }

  getCity() {
    this.api.get('cities').then((datas: any) => {
      console.log(datas);
      if (datas && datas.data.length) {
        this.cities = datas.data;
      }
    }, error => {
      console.log(error);
      this.error(this.api.translate('Something went wrong'));
    }).catch(error => {
      console.log(error);
      this.error(this.api.translate('Something went wrong'));
    });
  }

  public handleAddressChange(address: Address) {
    console.log(address);
    this.address = address.formatted_address;
    this.latitude = address.geometry.location.lat();
    this.longitude = address.geometry.location.lng();
    console.log('=>', this.latitude);
  }

  updateVenue() {
    this.Days =[];
    if(this.monday == true && this.monday_open_time && this.monday_close_time){
      this.Days.push({
        day:"MONDAY",
        open_time:this.monday_open_time,
        close_time:this.monday_close_time
      })
  }else{
    if(this.monday == true){
      this.error('opning and closing time is required');
      return;
    }
  }
  if(this.tuesday == true && this.tuesday_open_time && this.tuesday_close_time){
    this.Days.push({
      day:"TUESDAY",
      open_time:this.tuesday_open_time,
      close_time:this.tuesday_close_time
    })
  }else{
    if(this.tuesday == true){
      this.error('opning and closing time is required');
      return;
    }
  }
   if(this.wednesday == true && this.wednesday_open_time && this.wednesday_close_time){
    this.Days.push({
      day:"WEDNESDAY",
      open_time:this.wednesday_open_time,
      close_time:this.wednesday_close_time
    })
  }else{
    if(this.wednesday == true){
      this.error('opning and closing time is required');
      return;
    }
  }
   if(this.thursday == true && this.thursday_open_time && this.thursday_close_time){
    this.Days.push({
      day:"THURSDAY",
      open_time:this.thursday_open_time ,
      close_time:this.thursday_close_time
    })
  }else{
    if(this.thursday == true){
      this.error('opning and closing time is required');
      return;
    }
  }
   if(this.friday == true && this.friday_open_time && this.friday_close_time ){
    this.Days.push({
      day:"FRIDAY",
      open_time:this.friday_open_time ,
      close_time:this.friday_close_time
    })
  }else{
    if(this.friday == true){
      this.error('opning and closing time is required');
      return;
    }
  }
   if(this.saturday == true && this.saturday_close_time && this.saturday_open_time){
    this.Days.push({
      day:"SATURDAY",
      open_time:this.saturday_open_time ,
      close_time:this.saturday_close_time
    })
  }else{
    if(this.saturday == true){
      this.error('opning and closing time is required');
      return;
    }
  }
   if(this.sunday == true && this.sunday_open_time && this.sunday_close_time){
    this.Days.push({
      day:"SUNDAY",
      open_time:this.sunday_open_time ,
      close_time:this.sunday_close_time
    })
  }else{
    if(this.sunday == true){
      this.error('opning and closing time is required');
      return;
    }
  }
    console.log(this.name, this.address, this.descritions, this.time,
      this.openTime, this.closeTime);
    if (this.name === '' || this.address === '' || this.descritions === '' ) {
      this.error(this.api.translate('All Fields are required'));
      return false;
    }

    const geocoder = new google.maps.Geocoder;
    geocoder.geocode({ address: this.address }, (results, status) => {
      console.log(results, status);
      if (status === 'OK' && results && results.length) {
        this.latitude = results[0].geometry.location.lat();
        this.longitude = results[0].geometry.location.lng();
        console.log('----->', this.latitude, this.longitude);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
        return false;
      }
    });

    if (!this.coverImage || this.coverImage === '') {
      this.error(this.api.translate('Please add your cover image'));
      return false;
    }
    const param = {
      name: this.name,
      address: this.address,
      descriptions: this.descritions,
      lat: this.latitude,
      lng: this.longitude,
      cover: this.fileURL,
      // open_time: this.openTime,
      // close_time: this.closeTime,
      days:JSON.stringify(this.Days),
      cid: this.city,
      id: this.id,
      commission: this.commission
    };
    console.log('param', param);
    this.spinner.show();
    this.api.post('stores/editList', param).then((datas: any) => {
      console.log(datas);
      this.spinner.hide();
      if (datas && datas.status === 200) {
        this.navCtrl.back();
      } else {
        this.spinner.hide();
        this.error(this.api.translate('Something went wrong'));
      }

    }, error => {
      this.spinner.hide();
      console.log(error);
      this.error(this.api.translate('Something went wrong'));
    }).catch(error => {
      this.spinner.hide();
      console.log(error);
      this.error(this.api.translate('Something went wrong'));
    });

  }

  create() {
    this.Days = [];
    if(this.monday == true && this.monday_open_time && this.monday_close_time){
      this.Days.push({
        day:"MONDAY",
        open_time:this.monday_open_time,
        close_time:this.monday_close_time
      })
  }else{
    if(this.monday == true){
      this.error('opning and closing time is required');
      return;
    }
  }
  if(this.tuesday == true && this.tuesday_open_time && this.tuesday_close_time){
    this.Days.push({
      day:"TUESDAY",
      open_time:this.tuesday_open_time,
      close_time:this.tuesday_close_time
    })
  }else{
    if(this.tuesday == true){
      this.error('opning and closing time is required');
      return;
    }
  }
   if(this.wednesday == true && this.wednesday_open_time && this.wednesday_close_time){
    this.Days.push({
      day:"WEDNESDAY",
      open_time:this.wednesday_open_time,
      close_time:this.wednesday_close_time
    })
  }else{
    if(this.wednesday == true){
      this.error('opning and closing time is required');
      return;
    }
  }
   if(this.thursday == true && this.thursday_open_time && this.thursday_close_time){
    this.Days.push({
      day:"THURSDAY",
      open_time:this.thursday_open_time ,
      close_time:this.thursday_close_time
    })
  }else{
    if(this.thursday == true){
      this.error('opning and closing time is required');
      return;
    }
  }
   if(this.friday == true && this.friday_open_time && this.friday_close_time ){
    this.Days.push({
      day:"FRIDAY",
      open_time:this.friday_open_time ,
      close_time:this.friday_close_time
    })
  }else{
    if(this.friday == true){
      this.error('opning and closing time is required');
      return;
    }
  }
   if(this.saturday == true && this.saturday_close_time && this.saturday_open_time){
    this.Days.push({
      day:"SATURDAY",
      open_time:this.saturday_open_time ,
      close_time:this.saturday_close_time
    })
  }else{
    if(this.saturday == true){
      this.error('opning and closing time is required');
      return;
    }
  }
   if(this.sunday == true && this.sunday_open_time && this.sunday_close_time){
    this.Days.push({
      day:"SUNDAY",
      open_time:this.sunday_open_time ,
      close_time:this.sunday_close_time
    })
  }else{
    if(this.sunday == true){
      this.error('opning and closing time is required');
      return;
    }
  }

    console.log(this.email, this.fname, this.lname, this.phone, this.password, this.name, this.address, this.descritions, this.time)
    if (this.email === '' || this.fname === '' || this.lname === '' || this.phone === '' || this.password === ''
      || this.name === '' || this.address === '' || this.descritions === ''
      || this.city === '' || !this.city ||
       !this.commission || this.commission === '') {
      this.error(this.api.translate('All Fields are required'));
      return false;
    }

    const emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    if (!(emailfilter.test(this.email))) {
      this.error(this.api.translate('Please enter valid email'));
      return false;
    }

    if (!this.coverImage || this.coverImage === '') {
      this.error(this.api.translate('Please add your cover image'));
      return false;
    }

    const geocoder = new google.maps.Geocoder;
    geocoder.geocode({ address: this.address }, (results, status) => {
      console.log(results, status);
      if (status === 'OK' && results && results.length) {
        this.latitude = results[0].geometry.location.lat();
        this.longitude = results[0].geometry.location.lng();
        console.log('----->', this.latitude, this.longitude);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
        return false;
      }
    });

    const userParam = {
      first_name: this.fname,
      last_name: this.lname,
      email: this.email,
      password: this.password,
      gender: this.gender,
      fcm_token: 'NA',
      type: 'store',
      lat: this.latitude,
      lng: this.longitude,
      cover: this.fileURL,
      mobile: this.phone,
      status: 1,
      verified: 1,
      others: 1,
      date: moment().format('YYYY-MM-DD'),
      stripe_key: '',

    };

    console.log('user param', userParam);

    this.spinner.show();
    this.api.post('users/registerUser', userParam).then((data: any) => {
      console.log('datatatrat=a=ta=t=at=', data);
      if (data && data.data && data.status === 200) {
        const storeParam = {
          uid: data.data.id,
          name: this.name,
          mobile: this.phone,
          lat: this.latitude,
          lng: this.longitude,
          verified: 1,
          address: this.address,
          descriptions: this.descritions,
          images: '[]',
          cover: this.fileURL,
          status: 1,
          // open_time: this.openTime,
          // close_time: this.closeTime,
          days: JSON.stringify(this.Days) ,
          isClosed: 1,
          certificate_url: '',
          certificate_type: '',
          rating: 0,
          total_rating: 0,
          cid: this.city,
          commission: this.commission
        };
        console.log('****', storeParam);
        this.api.post('stores/save', storeParam).then((salons: any) => {
          console.log('salonaasssss--', salons);
          /*========= add store object in Firebase ===========*/
            this.api.createObjectInFirebase('store',salons.data.uid);
          /*========= add store object in Firebase ===========*/
          
          this.spinner.hide();
          this.navCtrl.back();
        }, error => {
          this.spinner.hide();
          console.log(error);
          this.error(this.api.translate('Something went wrong'));
        }).catch(error => {
          this.spinner.hide();
          console.log(error);
          this.error(this.api.translate('Something went wrong'));
        });
      } else {
        this.spinner.hide();
        if (data && data.data && data.data.message) {
          this.error(data.data.message);
          return false;
        }
        this.error(data.message);
        return false;
      }
    }, error => {
      this.spinner.hide();
      console.log(error);
      this.error(this.api.translate('Something went wrong'));
    }).catch(error => {
      this.spinner.hide();
      console.log(error);
      this.error(this.api.translate('Something went wrong'));
    });
  }

  error(message) {
    const toastOptions: ToastOptions = {
      title: 'Error',
      msg: message,
      showClose: true,
      timeout: 2000,
      theme: 'default',
      onAdd: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: () => {
        console.log('Toast  has been removed!');
      }
    };
    // Add see all possible types in one shot
    this.toastyService.error(toastOptions);
  }
  success(message) {
    const toastOptions: ToastOptions = {
      title: 'Success',
      msg: message,
      showClose: true,
      timeout: 2000,
      theme: 'default',
      onAdd: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: () => {
        console.log('Toast  has been removed!');
      }
    };
    // Add see all possible types in one shot
    this.toastyService.success(toastOptions);
  }

  preview_banner(files) {

    console.log('fle', files);
    this.banner_to_upload = [];
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    this.banner_to_upload = files;
    if (this.banner_to_upload) {
      console.log('ok');
      this.spinner.show();
      this.api.uploadFile(this.banner_to_upload).subscribe((data: any) => {
        console.log('==>>', data);
        this.spinner.hide();
        if (data && data.status === 200 && data.data) {
          this.fileURL = data.data;
          this.coverImage = environment.mediaURL + data.data;
        }
      }, err => {
        console.log(err);
        this.spinner.hide();
      });
    } else {
      console.log('no');
    }
  }

  getCurrency() {
    return this.api.getCurrecySymbol();
  }

  SelectDay(event,day){

  }

  setDays(){


  }

  checkCloseTime(event,openTime){
    console.log('event:checkCloseTime',openTime)
    this.ngZone.run(() => {
      if(!event.target.validity.valid){
        setTimeout(()=>{
          this.error(this.api.translate(event.target.validationMessage));
          event.target.value = '23:59';
          
          this[openTime] = event.target.value;
          console.log('monday_close_time',this.monday_close_time)
        },500)
         
      }
    });
    

  }
}
