---
date: "2018-11-07"
layout: "page"
title: "Computational Statistics I 2018"
---

https://courses.helsinki.fi/fi/mast32001/124789436

Is pretty hard... But cool cos lots of coding!

I used `jupyter/tensorflow-notebook:137a295ff71b` Docker image for launching the Jupyter notebooks provided in the course and it should run the code snippets. I think it had Python 3.5. NOTE: which actually fucking sucked as I couldn't install Pytorch on it. Decided to install instead Anaconda which seems to work fine.

# 6. Markov Chain Monte Carlo (MCMC)

## The idea

With the good ol Bayesien inference you'd calculate your **posterior distribution** as joint probability function divided by the **marginal distribution** of the evidence: $P(\Theta|D)=\frac{P(D|\Theta)P(\Theta)}{P(D)}$

However if you have ever had to calculate that by hand, you know it's *pretty* darn complicated computation. Also you'd probably had used logarithms since the sums might get super low or high.

>Building posterior is straightforward:  
>Bayesian inference is hard because integration is hard [[HMC-BC]](#HMC-BC)

Which brings to us these fancy things, MCMC methods, which are just a way to **approximate** the Bayesian formula in more computable way. And then there's cases where MCMC doesn't work so we switch to using different things, easy peasy! (not) [[VI-Py]](#VI-Py)

## Preface
Monte Carlo simulation was created by **Stan Ulam** who wanted to compute the probability of winning solitaire games but he quickly saw that computing it algorithmically was impossible (52 factorial) at that time. Instead he decided that what if he just played games and recorded their results to gain an approximation of the probability distribution. 

**MCMC** was introduced in 1953 by the Metropolis & co. In the paper they had a system made of molecules and for every molecule they first moved them a little, then computed the overall change in entropy based on which they either rejected or accepted the change. Hmm... MCMC methods are used to compute Bayesian inference with high-dimensionality.

MCMC includes various of different algorithms such as Metropolis-Hastings sampler and Gibbs sampler.

**Markov Chain** is a sequence of numbers that follow some state-transition. **Ergodic** Markov chains are those that satisfy two properties: any point can be reached from anywhere in the chain and the transitions will never get stuck in a loop. These type of markov chains often? converge to some **invariant distribution**
>Under still more conditions, Markov chains also satisfy a central limit theorem, which characterizes the speed of convergence in the ergodic theorem.

**Hidden Markov Chain** is a Markov chain that has stuff..

The idea behind MCMC methods is to set up an ergodic Markov chain that has the posterior distribution as its invariant distribution. It's surprisingly easy as you just simulate the values $\theta ^{(0)},..$ long enough until it reaches its invariant distribution. The required is called **burn-in**. After the invariant distribution has been reached the burn-in values are discarded. Also the resulting scalar can also be **thinned** by discarding every $k$th value to save space.

Setting up *some* MCMC algorithm is easy but the challenge is to find one that **converges rapidly**.

## Features
* Statistical method to simulate very high dimensional probability distributions
* We create a markov chain and pick probabilities that fit our distribution (?)
* Eventually we'll have a probability distribution close to the target distribution

## [Metropolis-Hastings algorithm](https://en.wikipedia.org/wiki/Metropolis%E2%80%93Hastings_algorithm)

[Youtube video that visualizes it well](https://www.youtube.com/watch?v=ZIEMlD94JP8). Especially how the chain works and **parallel tempering**.

MH is a way of obtaining a sequence of random samples from a distribution for which direct sampling is difficult. They are generally used for multi-dimensional distributions since using **rejection sampling** is much more efficient for single-dimensional distributions.

MH's idea is that we have a function which generates samples from a **proposal distribution** that simulates the higher dimensional distribution. By picking only values that satisfy the bounds which we limit it (xxx) as Markov chain sequence it will start behaving similar to the higher-dimensional distribution. After certain **burn-in** time (often 50% of the samples) the sampled Markov chain behaves similar to the target distribution **although** depending on our parameters that might be a good fit or not. It uses **Bayesian inference** to decide which values to take.

The proposal is accepted based on the quantity $a$:
$$ a = \frac{\pi(\theta')}{\pi(\theta^{(t)})} \frac{q(\theta^{(t)} ; \theta')}{q(\theta' ; \theta^{(t)})}$$
where $\theta'$ is the proposed new state, $\theta^{(t)}$ the current state, $\pi$ the target distribution and $q$ the proposal density function. In the case of **symmetric proposal density function** the terms cancel each other out leaving only $a = \frac{\pi(\theta')}{\pi(\theta^{(t)})}$.

![How Markov chain behaves in Metropolis-Hastings](https://raw.githubusercontent.com/TeemuKoivisto/notes/master/comp-stats-1/mh-chain-1.png "mh-chain-1")

![The jumping and burn-in](https://raw.githubusercontent.com/TeemuKoivisto/notes/master/comp-stats-1/mh-chain-2.png "mh-chain-2")

### Example of Metropolis algorithm
Here we have a Metropolis-Hastings sampler with $\mathcal{N}(0,1)$ as the target distribution using $Q(x' ; x) = \mathrm{Uniform}(x-0.5, x+0.5)$ as the proposal. As in this case when the proposal distribution is symmetric the x-values cancel out leaving just $a=π(θ′)π(θ(t))$ which is Metropolis algorithm.

It's preferred to use logarithms instead of division like here to get more accurate results (and save computing time).
```python
import numpy as np
import numpy.random as npr
import scipy.stats as stats

n = 4000
x = 0.0
accepts = 0
xs = np.zeros(n)
target = lambda x: stats.norm.pdf(x) # target probability function X ~ N(0,1)
for i in range(n):
    x_prop = npr.uniform(x-0.5, x+0.5) # proposal probability X ~ Uniform(x-0.5, x+0.5)
    p_prop = target(x_prop)
    p_targ = target(x)
    # prop/target is here the MH-ratio that is the difference of probability densities between
    # the proposed p and the target p. Smaller value means larger movement and vice-versa.
    # X ~ Uniform(0,1) here serves as a kind of filter that sometimes accepts large movements
    # but mostly it only accepts small movements. Once MH-value is accepted it's set as the next
    # x-value as it converges (hopefully) to a certain distribution.
    if npr.rand() < (p_prop / p_targ):
        accepts += 1
        x = x_prop
    xs[i] = x

print('acceptance rate ', accepts/n)
# drop the first 50% of the xs as burn in
xs = xs[len(xs)//2:]
# plot the histogram of x moving in the sample space, thin it by taking every 10th value
plt.hist(xs[::10], 50, density=True)
# plot the true value of target pdf
plt.plot(t, stats.norm.pdf(t))
plt.show()
plt.plot(xs[::10]) # plot the values of the Markov chain, thinned to every 10th value

```

### Example of Metropolis-Hastings algorithm
This is similar to the Metropolis-algorithm but in this case the proposal density function is also calculated to the quantity. We are using $\mathcal{N}(0,1)$ as the target distribution and $\mathrm{Laplace}(0, 1)$ as the proposal distribution.

```python
%matplotlib inline
import numpy as np
import numpy.random as npr
import matplotlib.pyplot as plt
import scipy.stats as stats

def mh_sampler(x, n, target, proposal_density, draw_proposal):
    xs = np.zeros(n)
    accepts = 0
    for i in range(n):
        x_prop = draw_proposal()
        p_targ = target(x)
        p_prop = target(x_prop)
        q_targ = proposal_density(x, x_prop)
        q_prop = proposal_density(x_prop, x)
        if npr.rand() < (p_prop/p_targ)*(q_targ/q_prop):
            accepts += 1
            x = x_prop
        xs[i] = x
    print('accept ratio ', accepts/n)
    return xs

target = lambda x: stats.norm.pdf(x)
proposal_density = lambda x, y: stats.laplace.pdf(x)

res = mh_sampler(1, 3000, target, proposal_density, npr.laplace)

vec = res[len(res)//2:]
t = np.linspace(4, -4, 100)
plt.hist(vec[::10], density=True)
plt.plot(t, stats.norm.pdf(t))
plt.show()
plt.plot(vec[::10])
```

### Gibbs sampling

In **multivariate** distributions when the number of dimensions is high choosing a new multi-dimensional sample point can be difficult. The different individual distributions might behave very differently and finding the right **jumping width** must be very precise to avoid **excessively slow mixing**. An alternative approach is then to use Gibbs sampling as a substitute for Metropolis-Hastings.

# 8. MCMC diagnostics and sampling multimodal distributions

It is generally impossible to tell if MCMC has **converged** but a number of diagnostics have been developed to detect if it **has not converged**. Also the efficiency of the sampler is of great interest to the statistician as it can vary a lot: from uselessly slow to reasonably fast. As all guarantees of MCMC are **asymptotic**, the efficiency can make a huge difference to the usability of the results.

MCMC converge works by starting $m$ chains from **widely dispersed** starting points and checking if they produce similar results. The similarity is measured by **potential scale reduction** $\hat{R}$, that measures the **factor** by which the scale of current distribution **might** be reduced if the simulations were continued until $n\rightarrow \infty$. It can be defined as $\hat{R}=\sqrt{\frac{Var(\theta)}{W}}$ where $W$ is the within-chain variance.

The efficiency of MCMC is generally evaluated by **autocorrelations of the samples**. This means the correlation of neighbouring samples after a given **lag** $k$.

Autocorrelation $\rho_k$ of a **wide-sense stationary process** $\theta_1, \theta_2, ...$ is defined as:

$$\rho_k=\frac{E\left[ \right (\theta_i - \mu)(\theta_{i+k} - \mu)]}{\sigma^2}, k=0,1,2,...$$


## Parallel tempering for MCMC with multimodal distributions

So instead of sampling using only a single target we're using multiple samples $\pi(\theta)^{\beta}$ for range of values $0 \le \beta \le 1$.

# 10. Automatic differentiation and optimisation

In statistics there is many cases where it's useful to know the **derivates** or **gradients** of functions in order to calculate or optimize the functions more efficiently. Automatic differentiation will do this *automatically* for you, wee! If you are smart enough to use them correctly, d'oh!

**Gradient** is a $n$-dimensional vector of partial derivates measuring the *change* of the function in each coordinate direction. It's often denoted as: $\nabla f(x) = \left( \frac{\partial f}{\partial x_1}, \dots, \frac{\partial f}{\partial x_n} \right)$ Note the cool nabla-symbol. [Gradient, Wikipedia](https://en.wikipedia.org/wiki/Gradient)

Geometrically gradient is a vector pointing to the direction where the function grows the fastest.

## 10.2 Approaches to automatic differentation

There are three main approaches for differentation of a function $f : {\mathbb{R}}^n \rightarrow {\mathbb{R}}^m$:

1. Numerical differentiation through finite differences: $f'(x) \approx \frac{f(x+h) - f(x)}{h}$
2. Analytic differentiation
3. Automatic differentiation

>Numerical differentiation provides limited accuracy, and is often quite inefficient in high dimensional problems.

>Analytic differentiation requires a lot of manual work, and numerically stable implementation of the results is often non-trivial.

>Automatic differentiation provides a very convenient computational solution that is easy, accurate and numerically stable. It can also easily differentiate algorithms such as for or while loops and not just expressions. Its main drawback is that efficient implementation can be challenging, especially when both  
$m,n>1$
 
## 10.3 Different modes of automatic differentiation

There is two *modes* of automatic differentiation that are commonly used:

**Forward mode** tracks all derivatives during the forward pass of computations. Meaning it uses a dual number system that computes both the original result and its derivatives at the same time. This works only if $n$ is *very small* as otherwise the data to be propagated becomes *yuge*.

**Backward mode** is based on using the **chain rule** which propagates the derivatives backward from the output (idk how in practise). Works for scalar-valued functions such as log-probabilities. In case of neural networks the algorithm is the same as the commonly used **back-propagation algorithm**.

## 10.5 Gradient-based optimisation methods

Depending on your resources, there is multiple available methods.

**Newton's method** is the *gold standard* in accuracy but often computationally too expensive.
$${\mathbf{x}}_{n+1} = {\mathbf{x}}_{n} - [{\mathbf{H}}_{{\mathbf{f}}({\mathbf{x}}_{n})}]^{-1} \nabla {\mathbf{f}}({\mathbf{x}}_n)$$

Approximations to Newton's method in decreasing order of speed and memory cost:

* Quasi-Newton methods approximate the Hessian: **BFGS**, **L-BFGS** (limited memory).
* **Conjugate gradient methods** that use conjugate search directions. Whatever that means.
* Gradient descent with plain $\nabla f(x_n)$

>For general purpose use, BFGS and L-BFGS are often good choices.

## 10.6 Stochastic gradient optimisation

For many optimisation problems in statistics such as maximum likelihood estimation (MLE) with independent identically distributed (iid) observations their gradients can be approximated using **_math_** that will converge under some *mild* conditions. Very interesting.

## 10.8 Optimisation examples

We'll try to find the MLE parameter for a Student's t-distribution. Using the gradient-stuff learned before we'll treat this as a **minimization of the negative log-likelihood** of the t-distribution. In math this would be:
$$f({\boldsymbol{\theta}}) = \sum_{i=1}^n - \log p(x_i | {\boldsymbol{\theta}})$$

### Autograd
```python
import autograd.numpy as np
import autograd.numpy.random as npr
import autograd.scipy.stats as sst
import autograd
import scipy.optimize
 
# Generate a synthetic data set
x = npr.randn(100) + 0.5
print('data mean:', x.mean(), 'data std:', x.std())

def student_logpdf_autograd(x, m, s, nu):
    return sst.t.logpdf(x, nu, m, s)
 
def ltarget(theta):
    return -np.sum(student_logpdf_autograd(x, theta[0],
                                           np.exp(theta[1]), 5.0))
 
g = autograd.grad(ltarget)
 
theta_opt = scipy.optimize.minimize(ltarget, np.zeros(2),
                                    method='BFGS', jac = g)
print('location estimate:', theta_opt.x[0],
      'scale estimate:', np.exp(theta_opt.x[1]))
```
### PyTorch
```python
import torch
import math
 
dtype = torch.double
device = torch.device("cpu")
# device = torch.device("cuda:0") # Uncomment this to run on GPU
 
# Generate a synthetic data set
x = torch.randn(100, device=device, dtype=dtype) + 0.5
print('data mean:', x.mean().item(), 'data std:', x.std().item())

def student_logpdf_pytorch(x, m, s, nu):
    return torch.distributions.studentT.StudentT(loc=m, scale=s,
                                                 df=nu).log_prob(x)
 
def ltarget(theta):
    return -student_logpdf_pytorch(x, theta[0], torch.exp(theta[1]),
                                   torch.tensor(5.0, device=device, dtype=dtype)).sum()
 
theta = torch.zeros(2, requires_grad=True, device=device, dtype=dtype)
optimizer = torch.optim.LBFGS([theta])
 
tol = 1e-6
l_old = math.inf
l_new = ltarget(theta)
while l_old - l_new > tol:
    l_old = l_new
    def closure():
        optimizer.zero_grad()
        l = ltarget(theta)
        l.backward()
        return l
    optimizer.step(closure)
    l_new = ltarget(theta)
 
print('location estimate:', theta[0].item(),
      'scale estimate:', theta[1].exp().item())
```

As copied straight from the A. Honkela's material. Not as simple as I expected... Maybe could use a rewrite, oh well [[CS1]](#CS1)!

### Maximum likelihood estimation of linear regression

So we all know how to do linear regression, right? You simply compute $formula$. However as an example we can use automatic differentiation to compute the same thing *but* in much more complicated way. Yay?

Linear regression has two parameters, $\alpha$ and $\beta$. Otherwise known as the location and the coefficient. To estimate them we can create a model $y_i = \beta x_i + \alpha + \epsilon_i$ by dissecting the original formula. Now here the noise aka. error $\epsilon$ is the only tricky part since it's random how we are going to estimate it? Well since it's *common knowledge* that the noise follows **standard normal distribution** $\epsilon-\mathcal{N}(0,1)$ we'll use that. NO MORE QUESTIONS.

And now we can generate our log-likelihood function:
$$L(\alpha, \beta) = \sum_{i=1}^n \log p(\epsilon_i | \alpha, \beta, x_i, y_i)$$

Vòila! So given our data $x$ and $y$ we can estimate $\alpha$ and $\beta$ by sampling our noise $\epsilon$ from standard distribution and then moving our gradient around whichever way the slope goes. Kewl.

Now it's of course *trivial* to build our model and find the parameters, right? Hah. Hah..

Well if you're smarter than me, which you probably are, you could do it but here I'll go and try to stich it together from the [[CS-1]](#CS1) material and my own imagination. Aand since maximing doesn't work with differentation (since the derivate is the lowest point of the function) we'll instead negate the value and go with **minimizing** the thing. Here we go!

```python
from scipy.optimize import minimize
import autograd.numpy as np # Not sure if this is needed since we're not using any special gradient-methods
import autograd

# Our somewhat shabby log-normal-pdf. Works though! Used for the value of epsilon
def log_norm_pdf(x, mu=0, sig=1):
    first = -0.5*(np.log(2*np.pi*sig**2))
    second = -(x-mu)**2/2*sig**2
    return first + second

# Our very silly dataset
datax = np.arange(0, 10)
datay = np.array([0,1,2,3,4,5,6,7,8,0])

def log_ll_linreg(params):
    a, b = params # Since using multiple arguments is a bitch we'll instead just pack them into one array
    # This funny formula is a variation of log joint normal probability function with x replaced with
    # linear regression parameters. Also the value is negated for minimization.
    return -np.sum(-0.5*np.log(2*np.pi)-0.5*(datay - a - b*datax)**2)

# A helper class to the store the gradient's values as it progresses
class recorder:
    def __init__(self):
        self.values = []
    
    def store(self, x):
        self.values.append(x)

hist_NM = recorder()
# Our actual computation. Nelder-Mead, otherwise known as "amoeba method", is a simple general search-method for finding the minimum or maximum values of a function
res_NM = minimize(log_ll_linreg, np.array([0.0, 0.0]), method='Nelder-Mead', callback=hist_NM.store)
hist_BFGS = recorder()
# BFGS is another method, quasi-Newton type, very popular also. Not as simple(?)
res_BFGS = minimize(log_ll_linreg, np.array([0.0, 0.0]), method='BFGS', callback=hist_BFGS.store)

print(res_NM)
print(res_BFGS)
```

# 11. Variational Inference (VI)

MCMC methods approximate the posterior $p(\theta|D)$ through samples. It's convenient because it doesn't require assumptions about the underlying distribution but it can be inefficient with higher dimensions.

**Variational inference** provides an alternative: fit an approximation $q(\boldsymbol{\theta}) \approx p(\boldsymbol{\theta}| \mathcal{D})$ with simple form such as normal distribution and turning the inference task into optimization problem. Because it's suitable with higher-dimensions and it's fast: typically at least **10 times faster than comparable MCMC**, it's popular with machine learning.

>Variational algorithms can often find good approximations of posterior means, but often underestimate the posterior variances.

Whatever that means (?)...

Compared to MCMC:
* Deterministic vs approximation using Monte Carlo
* Easy to gauge convergence -> easy to see when the algorithm has reached it's "peak" vs Monte Carlo
* Requires dozens of iterations vs Monte Carlo which requires thousands

It also doesn't require conjugacy (unlike say Gibbs sampling) while it benefits from it. VI involves also a bit more complicated math...

**Kullback-Leibler Divergence** is used to measure the closeness of the distributions between the **variational distribution** and the true distribution(?). Low divergence -> distributions are close [[ML-VI]](#ML-VI).

# 12. Hamiltonian Monte Carlo (HMC)


>Using gradient information of the target function can help improve MCMC convergence. Methods using this information are especially useful in high dimensions.

So you have your MCMC algorithm but it's *goddamn slow*. So you want it to converge faster so that you can move on to more important things. This is where **HMC** comes into picture as it's the same **Metropolis–Hastings** but with faster converge. This is done with **Hamiltonian evolution**, ooh.

And to be honest that Hamiltonian evolution is actually pretty weird thing. Well its dynamics are pretty intuitive: 
>Physical analogy to Hamiltonian MC: imagine a hockey pluck sliding over a surface without friction, being stopped at some point in time and then kicked again in a random direction.

>Hamiltonian MC employs the trick developed by nature (and well-known in statistical physics). Velocity vv is added to the parameters describing the system. Energy of the system consists of potential and kinetic parts:

$$E(\mathbf{x}, \mathbf{v}) = U(\mathbf{x}) + K(\mathbf{v}), \qquad K(\mathbf{v}) = \sum_i \dfrac{m \, v^2_i}{2}$$

>Thus, velocities $\mathbf{v}$ and positions $\mathbf{x}$ have independent canonical distributions:

$$p(x,v)∝exp(​\frac{​−E(x,v)}{T})=exp(​\frac{−U(x)}{T})exp(​\frac{​−K(v)}{T})∝p(x)p(v).$$

>So once we can sample from joint distribution $p(\mathbf{x}, \mathbf{v})$, we also can sample $\mathbf{x}$ by ignoring computed velocities $\mathbf{v}$.  
>[[HMC-AR]](#HMC-AR)

In other words explained by my TA: when you have a really complex multi-dimensional distribution normal MCMC will take forever to explore it. HMC on the other hand adds **momentum** that will help the MC to explore areas where the probability is high. Imagine the probability is being translated into 3d landscape where high probability corresponds to deep areas and low high. Any ball with gravity will follow those curvatures and not jump over the walls needlessly where the probability is low.

Also HMC is the current state-of-the-art MCMC algorithm if you have very high-dimensional data. Regular MCMC too can be applied if the distribution is much simpler. However instead of MCMC VI is commonly used since it can give really good results with little amount of work. I mean sure you have to choose your approximation distribution but after that it's dead simple. Only maybe if you need really high accuracy you might choose something like HMC.

## 12.1 Metropolis-adjusted Langevin algorithm (MALA)

The simplest way of incorporating gradient information.

Hmm math yo.. Looks hard to understand.

### Bonus: 2d correlated normal

```python
import numpy.linalg as npl

def corr_2d_normal(x, rho=0.998):
    Sigma = np.array([[1.0, rho],[rho, 1.0]])
    return -0.5*(x.T @ npl.solve(Sigma, x))

x = np.array([[3.234], [2.3]])
#x = np.array([[1.2412, -1.34], [3.234, 2.3]])
corr_2d_normal(x, rho=0.998)
```

Here we have a covariance matrix $\Sigma_2 = \begin{pmatrix} 1 & \rho \\ \rho & 1 \end{pmatrix}$ with $\rho = 0.998$. Basically two normal distributions with mean 0.998 and variance/std 1? Or mean is zero? Idk..

Then we'll give the function as input a square matrix that we transpose and multiply (@) by the linear matrix equation result of the two matrices. And multiply by $-0.5$ as that is the coefficient for the multivariate normal PDF.

## 12.2 Hamiltonian Monte Carlo (HMC)

Currently the most efficient general purpose samplers are based on Hamiltonian Monte Carlo (HMC).

## 12.3 Numerical solution of Hamilton’s dynamics

The most common approach to simulate these equations numerically is to use the so-called leapfrog integrator.

## 12.4 HMC algorithm

# 14. Likelihood-free inference and approximate Bayesian computation (ABC)

# References

## Sources

### CS1
* [Computational Statistics I, Antti Honkela, University of Helsinki, 2018-10-09](http://www.helsinki.fi/~ahonkela/teaching/compstats1/book)

### VI-PY
* [Austin Rochford, Variational Inference in Python, Youtube](https://www.youtube.com/watch?v=3KGZDC3-_iY)

### ML-VI
* [Machine Learning: Variational Inference, Jordan Boyd-Graber, University of Colorado Boulder, Youtube](https://www.youtube.com/watch?v=2pEkWk-LHmU)

### HMC-AR
* [Hamiltonian Monte Carlo explained, Alex Rogozhnikov, Dec 19, 2016](http://arogozhnikov.github.io/2016/12/19/markov_chain_monte_carlo.html)

### HMC-MB
* [Efficient Bayesian inference with Hamiltonian Monte Carlo, Michael Betancourt](https://www.youtube.com/watch?v=pHsuIaPbNbY&list=PLqdbxUnkqOw2nKn7VxYqIrKWcqRkQYOsF&index=11)