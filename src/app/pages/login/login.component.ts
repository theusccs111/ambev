import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module';
import { NzModalComponent } from 'ng-zorro-antd/modal';
import { TokenStorageService } from '../../services/token.storage.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule,
  ],
  providers: [NzModalComponent]
})
export class LoginComponent implements OnInit {
  protected username: string = '';
  protected password: string = '';
  protected loading = 0;
  protected showError: boolean = false;
  protected errorMsg: any;
  protected showPassword: boolean = false;
  protected form!: FormGroup;

  constructor(
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
    private router : Router,
    private fb: NonNullableFormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onSubmit() {
    if(this.form.valid){
      this.showError = false;
      let data = this.form.value;
      this.loading++;
      this.userService.login(data).subscribe(async (res) => {
        if (res.success) {
          this.loading--;
          await this.tokenStorageService.saveUser(res.data);
          window.location.href = '/sale';
        } else {
          this.loading--;
          this.showError = true;
          this.errorMsg = "Falha na autenticação do usuário. O seu usuário não possui acesso registrado no sistema. Entre em contato com o administrador do sistema para solicitar acesso";
        }
      }, (error: any) => {
        this.loading--;
        this.showError = true;
        this.errorMsg = "Falha na autenticação do usuário. O seu usuário não possui acesso registrado no sistema. Entre em contato com o administrador do sistema para solicitar acesso";
      })
    } else {
      this.showError = true;
      this.errorMsg = "Preencha os campos 'Usuário' e 'Senha' acima.";
      this.form.markAllAsTouched();
    }

  }
}
