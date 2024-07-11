import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { error } from 'jquery';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  invalidCheck: boolean = false;
  passwordVisibility: boolean = false;
  isLoading:boolean = false
  userdata: any;

  constructor(private toaster: ToastrService, private service: AuthService) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    })
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.invalidCheck = false
      this.service.getByCode('email', this.registrationForm.value.email).subscribe(res =>{
        this.userdata = res
        if(this.userdata.length === 0){
          const additionalData = {
            'role': 'not assigned',
            'status': false,
            'branch': 'not specified',
            'phone': 'not provided',
            'dob': '0000-00-00',
            'modeOfComm': null,
            'about': 'not provided',
            'profilePic': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcAAAAHABAMAAADHC6VAAAAALVBMVEX6+vqPj4/6+vqgoKDw8PDAwMCoqKjg4ODIyMi4uLjQ0NCYmJjo6OjY2NiwsLBrrJuzAAAAD3RSTlP///7///////////////8kSK6pAAAI1klEQVR4nO2dS4tcRRzFm9gaHSdC0WZ8tLrwEyhjokYSFI2JmoWiG4OKEkFFBMUHiiiKSvCxUHwFUYn4xo3iC1wpuIg7RSK4U3xAvoV9ZzCZzPRM161zTvX8L+f3BW796Hurqutx/r2Os2HaDVBjwehYMDoWjI4Fo2PB6FgwOhaMjgWjY8HoWDA6FoyOBaNjwehYMDoWjI4Fo2PB6FgwOhaMjgWjY8HoWDA6FoyOBaNjwehYMDoWjI4Fo2PB6FgwOhaMjgWjY8HoWDA6FoyOBaNjwehYMDoWjI4Fo2PB6FgwOhaMjgWjY0Eiez55d/7ClAZb/7n1x2oPrSf46KtpCTv2V3psLcHd9y7Va/jmpSoPriO48Znleg1bvq/w6CqCu+8Y5zf6Gj/QP7uG4JNfjPcb8bb84RUEH1lVb8R96qfrBdf0S2m7+PFywQl+Kd2pfb5acOckv5RekzZALDizev9ylMFBZQu0gv1Vxofjmbtc2ASt4Gc5filtEzZBKpjxAS5yk64NSsH+6K9DHgPdS6oUfDzXTzkaCgVn8v1SekrVCqHg020Ez1S1Qid4Yhu/lK4XNUMn+Eo7wbNEzZAJntLOL6WXNe2QCd7QVnCzph0qwZPb+qk6UpVgqy50kbMlDREJbmrvl9L9ipaIBK8sEfxK0RKNYP4sdCmSGalGsOUg/z+KwV4j+F6ZoKKbkQiWvaEpDQXvqETwpDK/lG7nt0UiWPiGSt5RhWDpGyp5RxWCrefZx+D3owrBK8oFz6A3RiGYtRg6njl6YwSCrdZilkOfjwoET0AE6QOFQPAXRJD+EQoEgU9Q8BHyBWcRP/5HyBcERsGGP8jN4QsCo2AD+18vX7B4IroIe3GNL1g8EV2E3cvQBcE+ht7L0AULVyuOQZ5v0wWheUzDBdz20AV/QAVP57aHLliwpH085J1CuiA0UWsgd6N0QdQvDbntYQtuhAXJ4wRbsGDbbDncbTS24Gm4IHerly0ID4PsgZAtCP6XaOAOhGxBeJxP6Rxqg9iC0ILMItz1e7Zg68MVK+FOZdahIPdIEFvwT1zwPGqD2ILwVHS0VU9tEFsQXLCwYGvYgrhfStQGWbAlFrSgBdvhYaIlFpwMd93Qk+2WtLwtMQ7uDiFbEF65X++C4P5uw7nUBnnRqSWdXzbs/MIveEqmgXtSxpsvLen89lkvI/pgbdb5Bmj3t7A7fwgBHgi547wPArWm80e54HGCnEXGP04JdqPcBQuFILhDyL6fxRe8DhMkn8UTCIInZdiBCHxBsJdh5x36Ykh7HkAEuQsyIwSCxTd4G8jzGIkg9BH+zG6NL0gWAHyE7FFQIwjMt/mxQJJr5sXLFoK4DklQQPG/+iBBAd2Peih9RxWBMo5bKaLzgTmdjzwq+9d7kaIlIsGi+Sh9HtqwjoLjNNl/KsGCbkYTwOnwxlI6H7/Z+QDV7kfgtvsKRV+gVLDVTxgxhrr3a77ft7JGOAoeoeth/r3e+3l+3wmb4IIaGDMZn+FQ1oM2qIvaXDNZUPgBjpCXJbp6kt9d2ufrC0tNGA3FfjVKg/02Tb8qxd1+WlVv+Kb84VXK8127Sl86p+1fFqgi2Ju9cZzfFkm4/TLqCPZ6h1aWyHy2yoNrCY6KnP61VO/SrhU5bdhz+LZ9TZna+SMvdLFM7ZSwYHQsGB0LRseC0bFgdCwYHQtGx4LRsWAes8/Pw9evl7H1AGXRjSP4GNtugeE7hKYxBPsvKvQatuE7hwRBnV9Kl6wHwQd1fildPH1B+Nr12qDbv7Bg3jZ8OegJE1iwqOJuG8CDzqhgebXIXMCfEBWU/4DoT4gKyn9A9E4hKEhIOJoMdJQUFIQuJOcC1SQEBSu8oWA3gwlWeUOxdxQTrNCHNiAl+zBBQhZlDsiBbkywyieIJZFBgpvq+EFZcpAgIcgwD+BWDCR4ai3Bz6ckWGWYbwCy1iDBSp0olJYHCRIyp/MAbm5BguI/88cAssggwUrD4PQEa/khI30MQaBCgwUtaEELWtCCFiyk81M1C7IAtidi/B+cliChBlEe0/rDS6hJmwew8gsJEmoQ5QEE40KChBpEeQAbaJAgoQZRHkCuKiRIqEGUBxBtHGPpHqhUBAlW2v+EjjtBgoQaRHlMa3cJr0GUx9T2B2stbSMnZUJsYSPJsZhgpYEQiRfHBKHc/nyQhP8Q52QOTk2wX0dweied6nSjUGHeCIfxoCoioGCV6TZURQQUFB+5XwTpY1DB8soL+WDFwtAjzRWWZbAEfFQQLASWA1bIBxWsMNRDnyB+MUQ+EoL1+mBB+UgI1gSFBeUDBRgwjl/OEu/ATP1ylvodRcukrPv7g2iCOi6ofUfhmqeEK67SsR4uk0IQlK6OwmVSGNfMhWtreMY/Q1DYzeBFGihJCLKtbEKVDYqgbJeJUCaFk2Uh+gkZZVI4gqKfkFHnhhS3IvljT6lzQxKUdKSUOjesRCDBWAjc51kCS3CWPiMdcFK4aZlO9Ou8pGJ9vNAqcj/DKsTEE9xEfUlJLyg1diyjOEg+f7NaxcxVy6zRk8N2WqOYgn3ajG0zr44PNRmPtXoxR6zTwI3+y6lCNJkBs9opOduQYTikliJkhzfihkNunRR6OiVqOCAXEuHHb85A+03M/mUBQb7oLDBafE2vc6MIUO1/VOp3N7+OnSYhdmdZNfNbBE0RReBuHFtoaW00ZZhkGb+HWvY1c4qfb4QuxLj/e4v3dLBXVUVSmdLc/zRTcfBW0Cquvf7Dx5XLGs+O/YFrgPZ6u55bUfVsKV8eeEj7/BpB4rsOv3HZWLkje/Ulwmolpe954sOb/903v/BRDua33vP63o+vqvJgR8FHx4LRsWB0LBgdC0bHgtGxYHQsGB0LRseC0bFgdCwYHQtGx4LRsWB0LBgdC0bHgtGxYHQsGB0LRseC0bFgdCwYHQtGx4LRsWB0LBgdC0bHgtGxYHQsGB0LRseC0bFgdCwYHQtGx4LRsWB0LBgdC0bHgtGxYHQsGB0LRseC0bFgdCwYnQ298zvOfxR8GhL2WDmBAAAAAElFTkSuQmCC'
          }
    
          const formData = { ...this.registrationForm.value, ...additionalData }
          this.isLoading = true
          this.service.proceedRegister(formData).subscribe(res => {
            this.toaster.info("Pending Administrator Approval", "Account Creation Pending")
            this.isLoading = false
            this.registrationForm.reset()
          }, err => {
            let errorMessage: string;
            if (err.error instanceof ErrorEvent) {
              errorMessage = `Client-side error: ${err.error.message}`;
            }else{
              if (err.status === 0) {
                errorMessage = 'Network error occurred. Please check your internet connection or try again later.';
              } else {
                errorMessage = `Server-side error: Status ${err.status}, Message: ${err.error}`;
              }
            }
            this.toaster.error(errorMessage)
            this.isLoading = false;
          })
        }else {
          this.toaster.warning("Email Already Exists")
        }   
      })
    } else {
      this.invalidCheck = true
    }
  }

}
